'use client'
import HambagerMenu from "@/app/components/hamberger_menu"
import NavBar from "@/app/components/navBar"
import ProtectedRoute from "@/app/components/protectedRoute"
import { useRouter } from "next/navigation"

function ChessGameSelection () {

    const router = useRouter()

    const handleNewGameClick = () => {
        console.log('the new game buttom has been clicked') // logging for errors
        router.push('/chess_match_interface');
    }

    const handlePuzzleButtonClick = () => {
        console.log('the puzle button has been clicked') // logging for errors 
        router.push('/chess_abilities/chess_puzzles')
    }

    return (
        <div className = "bg-chess-aesthetic-bg-brown flex flex-col min-h-screen">
            <div className = " flex py-4 px-2 gap-2 bg-chess-navs shadow-lg sticky top-0 z-10">
                <HambagerMenu/>
                <h1 className = "text-white font-bold">.Chess games</h1>
            </div>
            {/* main page cont will go here */}
            <div className = "flex-1 flex flex-col p-3 gap-4">
                {/* actual selections part */}
                <div className = "flex justify-center items-center p-4 gap-2 shadow-md bg-chess-navs">
                    {/* options div */}
                    <div className = "w-1/2 p-2 flex flex-col gap-2">
                        {/* play a game */}
                        <button className = "p-3 shadow-md rounded-lg bg-chess-edge-color text-chess-aesthetic-bg-brown font-bold"
                        onClick = {handleNewGameClick}>
                            Play new game
                        </button>
                        {/* play agains bots */}
                        <button className = "p-3 shadow-md rounded-lg bg-chess-edge-color text-chess-aesthetic-bg-brown font-bold">
                            play bots
                        </button>
                        {/* play a friend online */}
                        <button className = "p-3 bg-chess-edge-color rounded-lg shadow-md text-chess-aesthetic-bg-brown font-bold">
                            play a friend
                        </button>
                    </div>
                    {/* chessboard div */}
                    <div>
                        <img src="/chess_board.png" 
                        alt="" 
                        className = "rounded-lg w-40"/>
                    </div>
                </div>
                {/* the puszzles part will go here */}
                <div className = "rounded-lg bg-chess-navs shadow-md flex p-2">
                    <div className = "flex flex-col gap-4 itmes-center p-2 w-full">
                        <h2 className = "text-center">Play chess puzzles</h2>
                        <img src="/chess_puzzle.png"
                        alt=""
                        className = "rounded-lg  w-full " />
                        <button className = "bg-chess-edge-color rounded-lg p-2 text-chess-aesthetic-bg-brown font-bold"
                        onClick = {handlePuzzleButtonClick}>
                            New puzzle
                        </button>
                    </div>
                </div>
                 {/* game history will go here */}
                 <div className = "bg-chess-navs rounded-md p-5">
                    <div className = "">
                        <h1>this is the games history part</h1>
                    </div>
                </div>
            </div>
            <div className = 'sticky z-10 bottom-0'>
                <NavBar classname="text-white bg-chess-navs"/>
            </div>
        </div>
    )
}

export default function ChessGameSelectionPage() {
    return (
        <ProtectedRoute>
            <ChessGameSelection/>
        </ProtectedRoute>
    )
}