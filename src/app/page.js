"use client"
import { useState,useEffect } from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount,useContractRead,usePrepareContractWrite,useContractWrite ,useNetwork} from "wagmi";

export default  function Home() {
  const [walletMounted, setWalletMounted] = useState(false);
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { chain, chains } = useNetwork()
  let abi;
  let { data: balance, refetch } = useContractRead({
    address: "0x4c3089cB72572947C4eD822054CC25527d8EB9C6",
    abi: abi,
    functionName: "balanceOf",
    args: [address],
    enabled: isConnected && chain.name=="sepolia",
    onError(error) {
      console.log('Error in read operation', error, address)
    },
    onSuccess(data) {
      console.log("read success", data)
    },
  });

  let buySingle = async()=>{

  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    hi {walletMounted}
    <ConnectButton />
    <button className="mx-5">buySingle</button>
    </main>
  )
}
