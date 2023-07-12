import { useState } from 'react'
import { userContractCall } from '../hooks/useContractRead'
import History from '../component/History'
import ErrorAlert from '../component/alerts/ErrorAlert'
import SuccessAlert from '../component/alerts/SuccessAlert'
import LoadingAlert from '../component/alerts/LoadingAlert'


const HistoryList = () => {
    // use the useContractcall to know how many history are on the blockchain
    const { data } = userContractCall("getHistoryLenght", [], true);
    // convert data to a number

    const historyLength = data ? Number(data.toString()) : 0;
     // Define the states to store the error, success and loading messages

     const [error, setError] = useState('');
     const [success, setSuccess] = useState('');
     const [loading, setLoading] = useState('');

    //  define a clear funtion to clear the errror, success, loading states

    const clear = () => {
        setError('');
        setSuccess('');
        setLoading('');
    };

    // define a function to return all the history

    const getHistory = () => {
        // if there is no history, return null
        if(!historyLength) return null;
        const historys = [];
        // loop through the history on the blockchain and return the history component and push it to the histories arry
         for (let i = 0; i < historyLength; i++) {
            historys.push(
                <History 
                    key={i}
                    id={i}
                    setSuccess={setSuccess}
                    setError={setError}
                    setLoading={setLoading}
                    loading={loading}
                    clear={clear}
                />
            )
         }
         return historys;

    }
    return (
        <div>
            {/* if there is alert, display it */}
            {error && <ErrorAlert message={error} clear={clear} />}
            {success && <SuccessAlert message={success} />}
            {loading && <LoadingAlert message={loading} />}
            {/* to display the history */}
            <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
                <h2 className=' sr-only'>History</h2>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {/* Loop through the products and return the Product component */}
                    {getHistory()}
                </div>
            </div>
        </div>
    )
}

export default HistoryList;