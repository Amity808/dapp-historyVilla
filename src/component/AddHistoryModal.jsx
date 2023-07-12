import {useState, useEffect} from 'react'
// we use the ether to convert the history read amount to wei 
import { ethers } from 'ethers';
import { useAccount, useBalance } from 'wagmi' 
import { toast } from 'react-toastify';
// debounce hook to debounce the input fields
import { useDebounce } from 'use-debounce';
import { useContractSend } from '../hooks/useContractWrite'
import Erc20 from '../abis/erc20InstacnceAbi.json'


const AddHistoryModal = () => {
    const [toggle, setToggle] = useState(false)
    // const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [source, setSource] = useState('')
    const [imageURI, setImageURI] = useState('')
    const [imageURIS, setImageURIS] = useState('')
    const [readAmoumt, setReadAmoumt] = useState(0)
    // const [upvote, setUpvote] = useState(0)

    // The following states are used to store the debounced values of the form fields

    // const [ debounceAuthor ] = useDebounce(author,  500)
    const [ debounceDescription ] = useDebounce(description, 500)
    const [ debounceSource ] = useDebounce(source, 500)
    const [ debounceimageURI ] = useDebounce(imageURI, 500)
    const [ debounceimageURIS ] = useDebounce(imageURIS, 500)
    const [ debouncereadAmount ] = useDebounce(readAmoumt, 500)
    // const [ debounceUpvote ] = useDebounce(upvote, 500)

    const [loading, setLoading] = useState("")

    // to display the balance state is uded to store the cUsd balance of the user

    const [displayBalance, setDisplayBalance] = useState(false)

    // to check if al forms are submitted 
    const isComplete = 
    description && 
    source && 
    imageURI && 
    imageURIS && 
    readAmoumt;

    // clear the input feild after the form is submitted 
    const clearForm = () => {
        // setAuthor('')
        setDescription('')
        setSource('')
        setImageURI('')
        setImageURIS('')
        setReadAmoumt(0)
    }

    // to convert readAmount to wei

    const readAmountHistoryCon = ethers.utils.parseEther(
        debouncereadAmount.toString()
    )
    const { writeAsync: createHistory } = useContractSend('addHistory', [
        debounceDescription, debounceSource,
        debounceimageURI, debounceimageURIS, readAmountHistoryCon
    ]);

    // define a function that handles the creation of a history through the history village
    const handleCreateHistory = async () => {
        if (!createHistory) {
            throw "Failed to create history to the Blockchain"
        }
        // Create the product by calling the writeProduct function on the marketplace contract
        
        setLoading("Creating......")
        if (!isComplete) throw new Error("Please fill all fields")

        // const readHistoryTx = await createHistory();
        
        const readhistoryTx = await createHistory();
        setLoading("waiting for Confirmation.....")
        

        // waiting for the transaction to be mined 
        await readhistoryTx.wait()

        // closing the modal and clear the input fields after the history is added to the history village 
        setToggle(false);
        clearForm();

    }

    // Define function that handles the creation of a product, if a user submits the product form
  const addHistory = async (e) => {
    e.preventDefault();
    try {
        // display notification while the history is being added to the history village
        await toast.promise(handleCreateHistory(), {
            pending: "Adding History",
            success: "History Successfully Added",
            error: "Something went Wrong, Try again",
        });
        // Display error message if something go wrong
    } catch (error) {
        console.log({ e })
        toast.error(e.message || "Something went wrong. Try again.");
        // Clear the loading state after the history is added too history village
    } finally {
        setLoading('')
    }
  }
  const { address, isConnected } = useAccount();
  const {data: cUSDBalance } = useBalance({
    address: address,
    // token:  Erc20.address
  });
//   if the user is connect and has a balance, display the balance

    useEffect(() => {
        if (isConnected && cUSDBalance){
            setDisplayBalance(true)
            return;
        }
        setDisplayBalance(false)

    }, [cUSDBalance, isConnected])

    return (
        <div className='flex flex-row w-full justify-between'>
            <div>
                {/* add a botton to open the modal  */}
                <button className='inline-block ml-4 px-6 py-2.5 bg-black text-white font-medium text-md leading-tight rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                onClick={() => setToggle(true)}
                type='button'
                data-bs-toggle='modal'
                data-bs-target="#exampleModalCenter"
                >Add History</button>
                {/* Modal */}
                {toggle && (
                    <div className='fixed z-40 overflow-y-auto top-0 w-full left-0' id='modal'>
                        {/* Form with input fields for the product, that triggers the addProduct function on submit */}
                        <form onSubmit={addHistory}>
                            <div className=''>
                                {/* <div className='mb-5'>
                                    <input type="text" placeholder='Author Name' className=' text-base w-96 text-black border-2 p-5 rounded-3xl border-green-500' id='authorname' required 
                                    onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </div> */}
                                <div className='mb-5'>
                                <input type='text' name="description" id="description" placeholder='Enter Description' className=' text-base w-96 text-black border-2 p-5 border-green-500 rounded-3xl' required
                                    onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                                <div className='mb-5'>
                                    <input type="text" placeholder='Historical Source E.G Primary/Secondary' className=' text-base w-96 text-black border-2 p-5 border-green-500 rounded-3xl' id='source' required 
                                    onChange={(e) => setSource(e.target.value)}/>
                                </div>
                                <div className='mb-5'>
                                    <input type="text" placeholder='image URI' className=' text-base w-96 text-black border-2 p-5 border-green-500 rounded-3xl' id='imageURI' required 
                                    onChange={(e) => setImageURI(e.target.value)}/>
                                </div>
                                <div className='mb-5'>
                                    <input type="text" placeholder='Second Image URI' className=' text-base w-96 text-black border-2 p-5 border-green-500 rounded-3xl' id='imageURIS' required
                                    onChange={(e) => setImageURIS(e.target.value)}
                                    />
                                </div>
                                <div className='mb-5'>
                                    <input type="text" placeholder='Enter Read Amount not up to 1 celo usd' className=' text-base w-96 text-black border-2 p-5 border-green-500 rounded-3xl' id='readAmout' required 
                                    onChange={(e) => setReadAmoumt(e.target.value)}/>
                                </div>
                                {/* Button to close the modal */}
                                <div className="bg-gray-200 px-4 py-3 text-right">
                                    <button
                                    type="button"
                                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                                    onClick={() => setToggle(false)}
                                    >
                                    <i className="fas fa-times"></i> Cancel
                                    </button>
                                    {/* Button to add the product to the marketplace */}
                                <button type='submit' className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2' disabled={!!loading || !isComplete || createHistory}>
                                    {loading ? loading : "Add History"}
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            {/* Display the user's cUSD balance */}
            {displayBalance && (
                <span
                className="inline-block text-dark ml-4 px-6 py-2.5 font-medium text-md leading-tight rounded-2xl shadow-none "
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter"
                >
                Balance: {Number(cUSDBalance?.formatted || 0).toFixed(2)} cUSD
                </span>
            )}
        </div>
    )

}
export default AddHistoryModal;