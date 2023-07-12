import React from 'react'
import Header from '../component/Header'
import HistoryAbi from '../abis/historyvillage.json'
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import AddHistoryModal from '../component/AddHistoryModal'
import HistoryList from '../component/HistoryList'


const Home = () => {
  
  // console.log(data)
  
  return (
    <div>
        <ConnectButton />
        <AddHistoryModal />
        <Header />
        <HistoryList />
      <div>
        {/* {isLoading && (
          <div>
            {data}
          </div>
        )} */}

      </div>
    </div>
  )
}

export default Home
