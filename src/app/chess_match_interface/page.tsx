'use client'
import {CheckSquare2Icon} from 'lucide-react'
import HambagerMenu from '../components/hamberger_menu';

import { useEffect, useState } from 'react';

import ChessGame from '../chess_abilities/chess_components/Chessboard'
import ProfileIcon from '../components/profileIcon';
import CountryFlagIcon from '../components/flagIcons';
import { UserProfileResponse } from '../api/users';
import ProtectedRoute from '../components/protectedRoute';
import Header from '../components/header';
import NavBar from '../components/navBar';

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

function ChessMatch() {
    // define data points for storing states and data here
    const [userData , setUserData] = useState<UserProfileResponse | null>(null) // default to null for before loading
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        setLoading(false);
        },[])

    if (loading) {
        return(
            <div className='min-h-screen flex items-center justify-center' style={{backgroundColor: '#262522'}}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col" style={{backgroundColor: '#262522'}}>
            {/* Header */}
            <div className="sticky top-0 z-10 shadow-lg" style={{backgroundColor: '#302e2b'}}>
                {/* 
                <div className="px-4 py-2">
                    <h1 className="text-xl font-bold text-white">.ULVT_GAMERS</h1>
                </div>
                 */}
                <div className="flex items-center px-4 py-3 border-b" style={{borderColor: '#3C3B39'}}>
                    <HambagerMenu />
                    <h1 className="text-lg font-semibold text-white">Chess Match</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-1 py-4 space-y-6">
                {/* Opponent Info */}
                <div className="rounded-lg shadow-lg border p-4" style={{backgroundColor: '#3C3B39', borderColor: '#302e2b'}}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-500 rounded-full p-2">
                                <ProfileIcon width={32}/>
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-lg">{OpponentData.username}</h2>
                                <div className="flex items-center space-x-2">
                                    <span className="text-orange-300 font-semibold">{OpponentData.ranking}</span>
                                    <CountryFlagIcon code={OpponentData.country_code} size={14}/>
                                </div>
                            </div>
                        </div>
                        {/* Opponent Timer */}
                        <div className="rounded-lg px-4 py-3 border-2 border-orange-400" style={{backgroundColor: '#302e2b'}}>
                            <span className="text-orange-300 text-xl font-mono font-bold">{OpponentData.time}</span>
                        </div>
                    </div>
                </div>

                {/* Chess Board */}
                <div className="rounded-lg shadow-lg border p-2" style={{backgroundColor: '#3C3B39', borderColor: '#302e2b'}}>
                    <ChessGame/>
                </div>

                {/* User Info */}
                <div className="rounded-lg shadow-lg border p-4" style={{backgroundColor: '#3C3B39', borderColor: '#302e2b'}}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-500 rounded-full p-2">
                                <ProfileIcon width={32}/>
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-lg">{UserData.username}</h2>
                                <div className="flex items-center space-x-2">
                                    <span className="text-orange-300 font-semibold">{UserData.ranking}</span>
                                    <CountryFlagIcon code={UserData.country_code} size={14}/>
                                </div>
                            </div>
                        </div>
                        {/* User Timer */}
                        <div className="rounded-lg px-4 py-3 border-2 border-orange-400" style={{backgroundColor: '#302e2b'}}>
                            <span className="text-orange-300 text-xl font-mono font-bold">{UserData.time}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="sticky bottom-0 z-10">
                <NavBar bg="native-brown" textColor='text-white'/>
            </div>
        </div>
    )
}

<<<<<<< HEAD
export default function ChessMatchPage() {
    return (
        <ProtectedRoute>
            <ChessMatch/>
        </ProtectedRoute>
    )
}
// note : in typescript tsx all componet names must start with an uppercase letter
=======
export default chess_match_page;

>>>>>>> origin/master
