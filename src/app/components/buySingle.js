"use client"
import { useEffect, useState } from 'react';
import { encodeFunctionData } from 'viem'
import { useDebounce } from 'usehooks-ts'


import {
    usePublicClient,
    useDisconnect,
    usePrepareContractWrite,
    useContractWrite,
    useContractRead,
    useAccount,
    useNetwork,
    useWaitForTransaction,
} from "wagmi";

// dotenv.config();

import {
    SEAPORT_EXCHANGE_ADDRESS
} from "../scripts/utils/contractAddresses_Sepolia.js";

import {
    singleNFTCrowdfundAbi,
    singleNFTCrowdfundWithTokenAbi,
    collectionNFTCrowdfundAbi,
    collectionNFTCrowdfundWithTokenAbi,
    seaportExchangeAbi,
} from "../scripts/index.js";



export default function BuySingle() {

    const [buySingleArgs, setBuySingleArgs] = useState({
        caller: "",
        collectiveCrowdfundAddress: "",
        BasicOrderParameters: {},
        price: "",
        fixedGovernanceOpts: "",
    });

    // const seaportContract = new ethers.Contract(SEAPORT_EXCHANGE_ADDRESS, seaportExchangeAbi, signer);
    // const singleNFTProxy = new ethers.Contract(buySingleArgs.collectiveCrowdfundAddress, singleNFTCrowdfundAbi);
    // const calldata = (await seaportContract.populateTransaction.fulfillBasicOrder_efficient_6GL6yc(buySingleArgs.BasicOrderParameters)).data;


    const publicClient = usePublicClient();
    const [argsData, setArgsData] = useState("");
    const debouncedArgs = useDebounce(argsData, 500)

    const { config: buySingleConfig, isError: isPrepareError } = usePrepareContractWrite({
        address: collectiveCrowdfundAddress,
        abi: singleNFTCrowdfundAbi,
        functionName: 'buy',
        args: debouncedArgs,
        enabled: Boolean(debouncedArgs),
    })

    const { data: buySingleData, write: callBuySingle } = useContractWrite(buySingleConfig);
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: buySingleData?.hash,
    })

    let handleBuySingle = async () => {
        const aData = encodeFunctionData({
            abi: seaportExchangeAbi,
            functionName: 'fulfillBasicOrder_efficient_6GL6yc',
            args: buySingleArgs.BasicOrderParameters
        })
        setArgsData(aData);
        callBuySingle();
    }

    return (
        <div className="grid">
            <button onClick={handleBuySingle()}>buySingle</button>
        </div>
    )
}
