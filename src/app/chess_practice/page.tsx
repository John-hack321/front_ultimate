'use client'
import { Chess } from "chess.js"
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard"
import { useRef, useState } from "react"

export default function Board() {

    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;

    const [chessPosition , setChessPosition] = useState(chessGame.fen());

    // this is a function for making random moves since i dont have two users currently 
    function makeRandomMove() {
        const possibleMoves = chessGame.moves();

        if (chessGame.isGameOver()) {
            return ;
        }
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

        chessGame.move(randomMove);

        setChessPosition(chessGame.fen());

    }

    // now lets do one for handling the piece drop

    function onPieceDrop({sourceSquare , targetSquare} : PieceDropHandlerArgs) {
        // lets narrow the type so that if its null( eg when a piece is taken offboard )
        if (!targetSquare){
            return false;
        }
        try {
            chessGame.move({
                from : sourceSquare,
                to : targetSquare,
                promotion : 'q' // im told to always promote to king for simplicity for now 
            });

            // upon a succesful move we aught to update the position of the chess piece i guess 
            setChessPosition(chessGame.fen());

            // the for the automvated moves we make a random cpu move after a short delay
            setTimeout(makeRandomMove,500);

            // we then return true on a successful move i guess
            return true;
        }
        catch (error) {
            console.log(`an error occured :${error} `)
            return false;
        }
    }

    // we then set the chessbaordoprions props for passing into the chessboard
    const chessboardOptions = {
        position : chessPosition,
        onPieceDrop,
        id : 'play-vs-random'
    }

    return(
        //* we then now render the chessboard with the now new options as props  *
        <div>
            <Chessboard options={chessboardOptions}/>
        </div>
    )
}
