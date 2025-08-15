'use client'
import {Menu} from 'lucide-react'

import ProfileIcon from '../components/profileIcon';
import CountryFlagIcon from '../components/flagIcons';
import ChessGame from '../components/Chessboard'


// for now we will hard code the opponent data and change this once we move to production
const OpponentData = {
    'username' : "Opponent",
    'ranking' : 150,
    'country_code' : "KE",
    'time' : '10 : 00'
}

const UserData = {
    'username' : "JohnKingChessLord",
    'ranking' : 150,
    'country_code' : "KE",
    'time' : '10 : 00'
}



function chess_match_page() {
    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col gap-4 px-1" style={{backgroundImage: "url('/dark_mapple.png')"}}>
            {/* the navbar part at the top */}
            <div className = "text-white flex p-2 gap-4 items-center">
                <Menu size = {26}/> {/* later on impement an onclick functionality for this where it changes to x when clicked */}
                <h1 className = "text-lg font-bold tracking-wide">chess_matches</h1>
            </div>
            {/* opponent title and timer */}
            <div className = "bg-yellow-900 bg-opacity-70 backdrop-blur-sm shadow-lg rounded-lg py-3 flex items-center justify-between pr-4">
                <div className = "flex p-2 gap-2 items-center">
                    <ProfileIcon width={40}/>
                    <div className = "flex flex-col ">
                        <h2 className ="text-white text-lg font-bold ">{OpponentData.username}</h2>
                        <div className = "flex px-2 gap-2 items-center">
                            <h2 className = "text-white font-medium">{OpponentData.ranking}</h2>
                            <CountryFlagIcon code = {OpponentData.country_code} size={13}/>
                        </div>
                    </div>
                </div>
                {/* opponent timer : make this component reusable later on*/}
                <div>
                    <div className = "bg-yellow-950 bg-opacity-70 p-4 rounded-lg border border-gray-500">
                        <h1 className = "text-white text-2xl font-bold">{OpponentData.time}</h1>
                    </div>
                </div>
            </div>
            {/* the chessborad now  */}
            <div className = "shadow-2xl">
                <ChessGame/>
            </div>
            {/* native user status and time make this component reusable later on */}
            <div className = "bg-yellow-900 bg-opacity-70 backdrop-blur-sm shadow-lg rounded-lg flex items-center justify-between pr-4">
                <div className = "flex p-2 gap-2 items-center">
                    <ProfileIcon width={40}/>
                    <div className = "flex flex-col">
                        <h2 className ="text-white text-lg font-bold  ">{UserData.username}</h2>
                        <div className = "flex px-2 gap-2 items-center">
                            <h2 className = "text-white font-medium">{UserData.ranking}</h2>
                            <CountryFlagIcon code = {UserData.country_code} size={13}/>
                        </div>
                    </div>
                </div>
                {/* opponent timer : make this component reusable later on*/}
                <div>
                    <div className = "bg-yellow-950 bg-opacity-70 p-4 rounded-lg border border-gray-500">
                        <h1 className = "text-white text-2xl font-bold">{UserData.time}</h1>
                    </div>
                </div>
            </div>
            {/* the other button for different stuff */}
            <div className = "flex flex-col gap-4">
                {/* first two buttons */}
                <div className = "flex p-3 gap-4 w-full bg-yellow-900 bg-opacity-70 backdrop-blur-sm shadow-lg rounded-lg py-2">
                    <button className = "text-white bg-yellow-900 hover:bg-yellow-800 p-2 text-sm rounded-lg items-center w-1/2 ">Play New Game</button>
                    <button className = "text-white bg-yellow-900 hover:bg-yellow-800 p-2 text-sm rounded-lg items-center w-1/2 flex justify-center gap-2"><ProfileIcon width={12}/>FindPlayers</button>
                </div>
                {/* the big button */}
                <div className = "w-full px-3">
                    <button className = "w-full rounded-lg bg-yellow-900 bg-opacity-70 backdrop-blur-sm shadow-lg p-2 flex flex-col">
                        <span className='text-gray-300'>Game type</span>
                        <span className = "text-green-400">Rapid <span className='text-gray-200 text-sm'>10 minute game</span></span>
                    </button>
                </div>
                {/* next two buttons */}
                <div className = "w-full px-3 mt-2 flex gap-4">
                    <button className='text-white bg-yellow-900 hover:bg-yellow-800 w-1/2 p-2 rounded-lg'>Play a friend</button>
                    <button className = "text-white rounded-lg w-1/2 bg-yellow-900 hover:bg-yellow-800 px-2 py-4">Tournaments</button>
                </div>
            </div>
        </div>
    )
}

export default chess_match_page;

