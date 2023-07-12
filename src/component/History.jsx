import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { Link } from 'react-router-dom';
// import Link from 'react-router-dom'
// Import the useConnectModal hook to trigger the wallet connect modal
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
// to display notification 
import { toast } from 'react-toastify'
// Import our custom identicon template to display the owner of the product
// import { identiconTemplates } from './helpers/index'
// custom hooks that we created to interact with the smart contract
import { useContractApprove } from '../hooks/useApprove'
import { userContractCall } from '../hooks/useContractRead'
import { useContractSend } from '../hooks/useContractWrite'


const History = ({ id, setError, setLoading, clear }) => {
    // use the useAccount to store the user's addresss
    const { address } = useAccount();
    // use the useAccountCall hook to read the data of the history with the id passed  from history placed contract

    const {data: readHistory} = userContractCall('getHistory', [id], true)

    // use the useContractSend to purchase the product with the id passed
    const {writeAsync: readAmountPay} = useContractSend("getHistoryPay", [Number(id)]); 
    const [history, setHistory] = useState(null);

    // use the useContractApprove hook to approve the spending of the product's price

    const {writeAsync: approve } = useContractApprove(
        history?.readAmount?.toString() || "0"
    );

    // use the useConnectModel hook to trigger the wallet connect modal

    const { openConnectModal } = useConnectModal();
    // Format the history data that we read from the smart contract

    const getFormatHistory = useCallback(() => {
        if (!readHistory) return null;
        setHistory({
            owner: readHistory[0],
            // author: readHistory[1],
            date: readHistory[1],
            description: readHistory[2],
            source: readHistory[3],
            image: readHistory[4],
            secimg: readHistory[5],
            readAmount: readHistory[6],
            votes: readHistory[7]
        })
    }, [readHistory])

    // call the getformartHistory function when thr rawHistory state changes

    useEffect(() => {
        getFormatHistory();
    }, [getFormatHistory])

    const handleReadHistory = async () => {
        if (!approve || readAmountPay) {
            throw "Failed to read history";
        }

        // Approve the spending of the readHistory price 
        const approveTx = await approve()
        // wait for the transaction to b mined (1) is the number of confirmations we want to wait for
        await approveTx.wait(1);
        setLoading("Thanks For Reading This History ...")
         // Once the transaction is mined, purchase the product via our marketplace contract buyProduct function
         const res = await readAmountPay();
        //  wait for the transaction to be mined
        await res.wait();
    }
    // define the history function that is called when the user click the purchase button 
    const readAmountHistory = async () => {
        setLoading("Approve....");
        clear()

        try {
            // if the user is not connected trigger the connet modal
            if (!address && openConnectModal) {
                openConnectModal();
                return;
            }
            // if the user is connected, call the handlereadHistory 
            await toast.promise(handleReadHistory(), {
                pending: "Awaiting Transaction",
                success: "Thanks for reading our History",
                error: "Failed To Read History"
            })
            // if there is an error, display the error message

        } catch (e) {
            console.log({ e })
            setError(e?.reason || e?.message || "Something went wrong. Try again.")
        }finally {
            setLoading(null)
        }
    }; 
    // if the history cannot load return null
    if (!history) return null;

    // formaat the readAmount from the history from wei to cUSD otherwise the readAMount will be way too high
    // const readAmountHistoryFromWei = ethers.utils.formatEther(
    //     history.readAmount.toString()
    // )
    
    // return a jsx
    return (
        <div className=' shadow-lg relative rounded-b-lg'>
            {/* <p className='group'> */}
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-white xl:aspect-w-7 xl:aspect-h-8 ">
          {/* Show the number of products sold */}
          {/* <span
            className={
              "absolute z-10 right-0 mt-4 bg-amber-400 text-black p-1 rounded-l-lg px-4"
            }
          >
            {product.sold} sold
          </span> */}
          {/* Show the product image */}
          <img
            src={history.image}
            alt="image"
            className="w-full h-80 rounded-t-md  object-cover object-center group-hover:opacity-75"
          />
          <img
            src={history.secimg}
            alt="image"
            className="w-full h-80 rounded-t-md  object-cover object-center group-hover:opacity-75"
          />
          {/* Show the address of the product owner as an identicon and link to the address on the Celo Explorer */}
          <a
            href={`https://explorer.celo.org/alfajores/address/${history.owner}`}
            className={"absolute -mt-7 ml-6 h-16 w-16 rounded-full"}
          >
            {history.owner}
          </a>
        </div>

        <div className={"m-5"}>
          <div className={"pt-1"}>
            {/* Show the product name */}
            {/* <p className="mt-4 text-2xl font-bold">{history.author}</p> */}
            <div className="h-40 overflow-y-hidden scrollbar-hide">
              {/* Show the product description */}
              <h3 className="mt-4 text-sm text-gray-700">
                {history.description}
              </h3>
              <h3 className="mt-4 text-sm text-gray-700">
                {history.source}
              </h3>
            </div>
          </div>

          <div>
            <div className={"flex flex-row"}>
              {/* Show the product location */}
              {/* <img src={"/location.svg"} alt="Location" className={"w-6"} /> */}
              <h3 className="pt-1 text-sm text-gray-700">{history.readAmount}</h3>
            </div>

            {/* Buy button that calls the purchaseProduct function on click */}
            <button
              onClick={readAmountHistory}
              className="mt-4 h-14 w-full border-[1px] border-gray-500 text-black p-2 rounded-lg hover:bg-black hover:text-white"
            >
              {/* Show the product price in cUSD */}
              Buy for  cUSD
              {/* {readAmountHistoryFromWei} */}
            </button>
          </div>
        </div>
            {/* </p> */}
        </div>
    )
}

export default History;