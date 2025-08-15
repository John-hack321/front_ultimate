'use client';
import { useEffect, useMemo, useRef , useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, PieceDropHandlerArgs, SquareHandlerArgs } from "react-chessboard";
import Engine from "../engines/stockfish/engine";

type Square = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8' |
              'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8' |
              'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8' |
              'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8' |
              'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8' |
              'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' |
              'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8' |
              'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8';

export default function ChessGame() {

  // initialize the engine first
  const engine = useMemo(() => new Engine , []);

  // make the chessgame use useRef from react to always get the latest game state

  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current; 

  // when using click to move we have to implement more states to track the state of the chessboard
  const [chessPosition , setChessPosition] = useState(chessGame.fen())
  const [moveFrom , setMoveFrom ] = useState('') // preset to an empty string
  const [optionSquares , setOptionSquares] = useState({});

  // setup the engine variables
  const [positionEvaluation , setPositionEvaluation] = useState(0); // default value of 0
  const [depth , setDepth] = useState(10); // a default depth of 10
  const [bestLine , setBestLine] = useState('');
  const [possibleMate , setPossibleMate] = useState('');

  // when the chess game position changes find the best move 
  useEffect(() => { // what this useState function does is it tracks the current board state and on change it will try to find the best move based on the board state
    if (!chessGame.isGameOver() || chessGame.isDraw()) { // dont forget ot call them with the parenthesis
      findBestMove();
    };
  }, [chessGame.fen()] );

  function findBestMove() {
    engine.evaluatePosition(chessGame.fen() , 18)
    engine.onMessage(({
      positionEvaluation,
      possibleMate,
      pv,
      depth
    }) => {
      // ignore the messages with a depth of less than 10
      if (depth && depth < 10) {
        return;
      }

      // update the position evaluation accordingly
      if (positionEvaluation) {
        setPositionEvaluation((chessGame.turn() === 'w' ? 1 : -1) * Number(positionEvaluation) / 1000); // this line set the identifier fr the white or black pieces by asigning a number then gets the evaluation and multiplies with it
      };

      // update teh possibleMate , depth and bestline
      if (possibleMate) {
        setPossibleMate(possibleMate)
      };
      if (depth) {
        setDepth(depth)
      };
      if (pv) {
        setBestLine(pv);
      }
    });
  }

  // for now we are going to create automated chess for the opponent 
  const oponent = ""; // for now we will leave it blank and add more functionality later on

  // for the opponet random move 
  // for now we will use this simple one later on we will use advances such as using the stockfish api
  function makerandomMove() {
    const possibleMoves = chessGame.moves();
    // if chessgame is over finish game
    if (chessGame.isGameOver()) {
      console.log('game over')
      return ;
    }
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

    // we then make that random move
    chessGame.move(randomMove)

    // after moving the chesspeice we update the board state
    setChessPosition(chessGame.fen())

  }

  // a function for getting the valid moves for a squeare

  function getMoveOpetions (square : Square) {
    /*
    from what I think i know so far I think this function is for getthing the possible moves that a user can have and highlighting them on the board
    */
    const moves = chessGame.moves({
      square,
      verbose : true,
    });

    // if there are no moves , clear the optionSquares 
    if (moves.length === 0) {
      setOptionSquares({});
      return false ;
    }

    // else we create a new object to store the optionsquares
    const newSquares : Record<string , React.CSSProperties> = {};

    // loop through the moves to and set the options squares
    for (const move of moves ) {
      newSquares[move.to] = {
        background: chessGame.get(move.to) && chessGame.get(move.to)?.color !== chessGame.get(square)?.color ? 'radial-gradient(circle, rgba(0, 128, 0, 0.5) 85%, transparent 85%)' // larger circle for capturing
          : 'radial-gradient(circle, rgba(0, 128, 0, 0.5) 25%, transparent 25%)',
          // smaller circle for moving
          borderRadius : '50%'
      };
    }

    // we then set the square we wanna move from to yellow
    newSquares[square] = {
      background : 'rgba(255 , 255 , 0 , 0.4)'
    };

    // the set the optionSquares to the new squares 
    setOptionSquares(newSquares)

    // return true to show that are move squares 
    return true ;

  };

  function onSquareClick ({square , piece} : SquareHandlerArgs) {
    if (!moveFrom && piece) {
      // get the move options for the square
      const hasMoveOptions = getMoveOpetions(square as Square);
      // if move options , set the moveFrom to the square
      if (hasMoveOptions) {
        setMoveFrom(square)
      }

      return;

    }

    // checking if the square clicked to move to is a valid move
    const moves = chessGame.moves({
      square : moveFrom as Square,
      verbose : true,
    });

    const foundMove = moves.find(m => m.from && m.to === square);

    // if its not a valid move 
    if (!foundMove) {
      // check if clicked on a new place
      const hasMoveOptions = getMoveOpetions(square as Square);

      // if new piece , setMoveFrom , otherwise cleare moveFrom
      setMoveFrom(hasMoveOptions ? square : '');

      // return early
      return;

    }
     // is normal move
    try {
      chessGame.move({
        from : moveFrom,
        to : square,
        promotion : 'q',
      });
    }catch (error) {
      console.log(`an error occured : ${error}`)

      // if invalid getMove and setMoveOptions
      const hasMoveOptions = getMoveOpetions(square as Square)

      // if new piece , setMoveFrom otherwhise clear MoveFrom
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      return;
  }

  // update the board position
  setChessPosition(chessGame.fen())

  // make a reandom cpu move i believe for the opponent part

  // then clear moveFrom and optionSquare
  setMoveFrom('');
  setOptionSquares({});

  setTimeout(makerandomMove , 300);

  }
  
  // and now the onDrop prop piece handler
  function onPieceDrop({sourceSquare , targetSquare} : PieceDropHandlerArgs) {
    // prevent bad move such as moving a peice offbaord
    if (!targetSquare) {
      return false;
    }
    
    try {
      chessGame.move({
        from : sourceSquare,
        to : targetSquare ,
        promotion : 'q', // as said before for simplicity we now promote to queen first
      });

      // lets add the engine functionalities here 
      // begining with some state updates

      setPossibleMate('');

      // update the game state 
      // setChessPosition(chessGame.fen()) this is commented for now since the game state is already updated down there

      // upon a successful move we set the update the chessgame status as always 
      setChessPosition(chessGame.fen());

      // stop the engine ( it will be restarted by the useEffect running findBestMove)
      engine.stop();

      // reset the bestline
      setBestLine('');

      // we then make the random oponent move
      setTimeout(makerandomMove,500 ) // we use the timeout to make the random move appear after some delay not just instant 

      // if the game is over we will return false
      if (chessGame.isGameOver() || chessGame.isDraw()) {
        return false;
      }
      // return true 
      return true;

    }catch (error) {
      console.log(`an error occured : ${error}`)
      return false;
    };

  }

  // get the best move
  const bestMove = bestLine?.split(' ')?.[0];

  // create the props to pass the react-chessboard component
  {/* commentedd for testing in order to experiment with the options for bestmoves
  const chessboardOptions = {
      onPieceDrop,
      onSquareClick,
      position : chessPosition,
      squareStyles: optionSquares,
      id: 'play-vs-random-drag-drop' // note when wrirint css selectors avoid spaces to avoid making them selectors 
    }
      */}

  // new chessboard options 
  const chessboardOptions = {
    arrows: bestMove ? [{
      startSquare: bestMove.substring(0, 2) as Square,
      endSquare: bestMove.substring(2, 4) as Square,
      color: 'rgb(0, 128, 0)'
    }] : undefined,
    onSquareClick,
    position: chessPosition,
    squareStyles : optionSquares,
    onPieceDrop,
    id: 'analysis-board'
  };

    // and just like that i belive we will have create a fully functinal chessboard

  return (
    <div>
      <div>
        Position Evaluation:{''}
        {possibleMate ? `#${possibleMate}` : positionEvaluation}
        {'; '}
        Depth: {depth}
        <div>
          Best line : <i>{bestLine.slice(0, 40)}</i>...
        </div>
        <Chessboard options = {chessboardOptions}/>
      </div>
    </div>
    
  )
<<<<<<< HEAD
}
=======
}
// implementing the onClick functinality for the squares 
>>>>>>> origin/master
