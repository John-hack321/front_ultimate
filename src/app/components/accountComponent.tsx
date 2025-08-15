'use client'

interface AccountBalanceProps {
    balance: number
}// tesing cli


export default function AccountBalance( {balance} : AccountBalanceProps ){

    return (
        <div className = 'bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white' >
            <div className = 'flex justify-between items-center'>
                <div>
                    <p className = 'text-blue-100 text-sm'>Available Balance</p>
                    <p className = 'text-3xl font-bold'>
                        <span className = 'text-lg'>KES</span>{balance}
                    </p>
                </div>
                <div className = ''>
                    <p className = 'text-blue-100 text-sm'>Ready to stake</p>
                    <p className = 'text-xl font-semibold'>COD WARS</p>
                </div>
            </div>
        </div>
    )
}





{/*
<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">

<div className="flex justify-between items-center">
    <div>
        <p className="text-blue-100 text-sm">Available Balance</p>
        <p className="text-3xl font-bold">
            <span className="text-lg">KES</span> {userData.account_balance}
        </p>
    </div>
    <div className="text-right">
        <p className="text-blue-100 text-sm">Ready to Stake</p>
        <p className="text-xl font-semibold">COD WARS</p>
    </div>
</div>
</div>

*/}