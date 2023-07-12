// this hook is approve the history village contract to send the use cUSD token


// import the wagmi hooks to prepare and write the contract

import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import ERC20 from '../abis/erc20InstacnceAbi.json';
import HistoryAbi from '../abis/historyvillage.json'
// to handle the big numbers used in celo we need big number
import { BigNumber } from 'ethers';



export const useContractApprove = (readAmount) => {
    // the gas limit when sending a transaction 
    const gasLimit = BigNumber.from(1000000);
    // prepare the write to the smart contract
    const { config } = usePrepareContractWrite({
        address: ERC20.address,
        abi: ERC20.abi,
        functionName: 'approve',
        args: [HistoryAbi.address, readAmount],
        overrides: {
            gasLimit
        },
        onError: (err) => {
            console.log({ err })
        }
    })

    // write to the smart contract using the prepare config

    const { data, isSuccess, write, writeAsync, error, isLoading } = useContractWrite(config)
    return { data, isSuccess, write, writeAsync, isLoading }
}