import Head from "next/head"
import styles from "../styles/Home.module.css"
// import Header from "../components/ManualHeader"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import { useNotification } from "web3uikit"
import { useQuery, gql } from "@apollo/client"
import networkMapping from "../contants/networkMapping.json"

export default function Home() {
    const GET_ACTIVE_ITEMS = gql`
        {
            activeItems(first: 5, where: { buyer: "0x0000000000000000000000000000000000000000" }) {
                id
                tokenId
                buyer
                seller
                nftAddress
                price
            }
        }
    `
    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)
    const dispatch = useNotification()
    const deployNetwork = "EthereumTestgorli"
    const networks = {
        EthereumTestgorli: {
            chainId: `0x${Number(5).toString(16)}`,
        },
    }
    const changeNetwork = async () => {
        try {
            if (!window.ethereum) {
            }
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [
                    {
                        ...networks[deployNetwork],
                    },
                ],
            })
        } catch (err) {}
    }
    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "5"

    if (chainString != "5") {
        changeNetwork()
    } else {
        const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]
        return (
            <div className=" text-yinblue container mx-auto">
                <h1 className="py-4 px-4 font-bold text-2xl ">Recently Listed</h1>
                <div className="flex flex-wrap ">
                    {isWeb3Enabled ? (
                        loading || !listedNfts ? (
                            <div>Loading...</div>
                        ) : (
                            listedNfts.activeItems.map((nft) => {
                                console.log(nft)
                                const { price, nftAddress, tokenId, seller } = nft
                                return (
                                    <NFTBox
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        marketplaceAddress={marketplaceAddress}
                                        seller={seller}
                                        key={`${nftAddress}${tokenId}`}
                                    />
                                )
                            })
                        )
                    ) : (
                        <div>Web3 Currently Not Enabled</div>
                    )}
                </div>
            </div>
        )
    }
}
