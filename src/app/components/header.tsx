'use client'

export default function Header() {

    const handleClick = () => {
        console.log("the deposit button has been clicked");
    }
    return (
        <div className = "text-black flex justify-between py-3">
            <div>
                <h1 className = "mt-2 text-xl font-extrabold">.ULVT_GAMERS</h1>
            </div>
        </div>
    )
}

