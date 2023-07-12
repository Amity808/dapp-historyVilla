import { useContractRead } from 'wagmi'
import HistoryAbiInstanc from '../abis/historyvillage.json'

export const userContractCall = (functionName, args, watch, from) => {

    const resp = useContractRead({
        address: HistoryAbiInstanc.address,
        abi: HistoryAbiInstanc.abi,
        functionName: functionName,
        args,
        watch,
        overrides: from ,
        onError: (err) => {
            console.log({ err })
        }

    })
    
    return resp
}