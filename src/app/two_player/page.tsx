'use client'
import {Chessboard, PieceDropHandlerArgs, PieceHandlerArgs} from "react-chessboard"
import { Chess } from "chess.js"
import { useRef , useState , useMemo , useEffect } from "react"
import { generateRandomMoveFen } from "../chess_abilities/chessConfigurations/generalChessConfigs"
import {socket} from "../test_socket_page/page";
import { Span } from "next/dist/trace"

type Square = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' |
              'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8' |
              'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' |
              'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8' |
              'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8' |
              'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' |
              'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8' |
              'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';

type Move = {
    'sid' : string,
    'move' : string,
}


export default function twoPlayerChess () {

    const chessGameRef = useRef(new Chess())
    const chessGame = chessGameRef.current;

    const [chessPosition , setChessPosition] = useState(chessGame.fen());
    const [moveFrom , setMoveFrom] = useState('');
    const [optionSquares , setOptionSquares] = useState({});
    const [playAsWhite , setPlayAsWhite] = useState(true);
    const [isConnectd , setIsConnected] = useState(socket.connected);
    const [foreignGameState , setForeignGameState] = useState('');
    const [fenString , setFenString] = useState('');

    socket.on('make_move' , (data : Move) => {
        console.log(`the move has been made by ${data.sid} and the move received is ${data.move}`)
        console.log(`this is the game state before : ${chessGame.fen()}`)
        const previousGameState = chessGame.fen()
        setForeignGameState(data.move);
        chessGame.move(data.move);
        console.log(`the new game state after the move is : ${chessGame.fen()}`)
        console.log(`so has the game state actualy changed ? : lets compare ${previousGameState === chessGame.fen()}`)
        setChessPosition(data.move)
    })
    

    useEffect(() => {

        
        
        socket.on('connect' , () => {
            setIsConnected(socket.connected)
        })

        // socket.on('disconnect' , () => {
        //    setIsConnected(socket.connected)
        // })

    } , [])

    const handleChessPieceMove = (moveMade : string ) => {
        socket.emit('make_move' , moveMade)
    }

    const handleRandomMove = () => {
        const newFen = generateRandomMoveFen(chessGame.fen())
        if (newFen) {
            chessGame.move(newFen);
            setChessPosition(newFen)
            return true;
        }else{
            console.log('the random move funtioin failed teribly')
            return false;
        }
    }

    function onPieceDrop ( {sourceSquare , targetSquare} : PieceDropHandlerArgs)  {
        if (!targetSquare) {
            return false;
        }

        try {
            chessGame.move({
                from : sourceSquare , 
                to : targetSquare , 
                promotion : 'q',
            })

            setChessPosition(chessGame.fen())
            try {
                // we need to send the game state via the internet
                console.log('the handleChessPieceMove functoin has been called')
                handleChessPieceMove(chessGame.fen())
                console.log('the move has been sent over the internet to the opponent ')
            } catch (error) {
                console.log('an error occured trying to talk to the sio server' , error)
            }
            return true;

        } catch (error) {
            console.log(`an error occured ${error}`)
            return false;
        }
    }

    function canDragPieceWhite({piece} : PieceHandlerArgs) {
        return piece.pieceType[0] === 'w';
      }

    function canDragPieceBlack ({piece} : PieceHandlerArgs) {
        return piece.pieceType[0] === 'b';
    }

    const whiteChessboardOptions = {
        onPieceDrop ,
        canDragPiece : canDragPieceWhite,
        boardOrientation : 'white' as const,
        position : chessPosition,
        id : 'mulitplayer-white'
    }

    const blackChessboardOptions = {
        onPieceDrop ,
        canDragPiece : canDragPieceBlack,
        boardOrientation : 'black' as const,
        position : chessPosition,
        id : 'mulitplayer-black'
    }

    const handlePlayAsClick = () => {
        console.log('the play as button has been clicked')
        setPlayAsWhite(!playAsWhite)
    }

    return (
        <div className="p-2 flex flex-col gap-2">
            <div>
                <button 
                onClick={handlePlayAsClick}
                className = "p-2 border bg-chess-icons-orange rounded-lg border-chess-icons-orange text-shadow-chess-aesthetic-bg-brown">
                    {playAsWhite ? (
                        'play as black'
                    ) : (
                        'play as white'
                    ) }
                </button>
                <p>status : {isConnectd ? 
                (<span className="text-green-500 font-bold">connected</span>) :
                 (<span className="text-red-500 font-bold">not connected</span>)}</p>
            </div>
            { playAsWhite ? (
                <Chessboard options={whiteChessboardOptions} />
            ) : (
                <Chessboard options={blackChessboardOptions} />
            )}
        </div>
    )
}