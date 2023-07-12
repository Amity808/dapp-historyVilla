import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import HistoryAbi from '../abis/historyvillage.json'
import { BigNumber } from 'ethers'


// to write  a contact 

export const useContractSend = (functionName, args) => {
    // the gas limit to use when sending a transaction 
    const gasLimit = BigNumber.from(1000000)

    // prepare the write to the smart contract

    const { config } = usePrepareContractWrite({
        // the address of the smart contract, in the cse the history celo 
        address: HistoryAbi.address,
        // the abi of the smart contract
        abi: HistoryAbi.abi,
        functionName,
        args,
        overrides: {
            gasLimit
        },
        onError: (err) => {
            console.log({ err })
        }
    })

    const { data, isSuccess, write, writeAsync, error, isLoading } = useContractWrite(config)
    return { data, isSuccess, write, writeAsync, isLoading }
}