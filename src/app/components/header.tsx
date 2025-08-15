'use client'

export default function Header() {

    const handleClick = () => {
        console.log("the deposit button has been clicked");
    }
    return (
        <div className = "text-black flex justify-between py-3">
            <div>
                <h1 className = "mt-2 text-xl font-extrabold">.COD_WARS</h1>
            </div>
            <div>
                <button
                onClick={handleClick}
                className = "text-black px-3 py-1 border rounded-lg mt-1 mr-2">Deposit</button>
            </div>
        </div>
    )
}

