import { ConnectButton } from "web3uikit"
import Link from "next/link"
export default function Header() {
    return (
        <nav className="non-italic font-bold bg-liyellow text-yinblue flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">Goerli NFT Marketplace</h1>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <button className="mr-4 p-6">HOME</button>
                </Link>
                <Link href="/sell-nft">
                    <a className="mr-4 p-6">SELL NFT</a>
                </Link>
                <ConnectButton className="mr-4 p-6" moralisAuth={false} />
            </div>
        </nav>
    )
}
