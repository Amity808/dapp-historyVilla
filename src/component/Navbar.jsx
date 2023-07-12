import {useAccount, useBalance} from 'wagmi'
import React from 'react'


const Navbar = () => {
 const {account, address} = useAccount()

 const { data } = useBalance({
  address: address,
  formatUnits: 'ether',
  watch: true
 })

  return (
    <div className='flex flex-row justify-between items-center'>
      <div>
        <h1 className=' text-3xl font-extrabold text-green-500 hover:border-b-4'>History Vila</h1>
      </div>
      {/* <div className=' border-2 rounded-full pl-3 pt-2 pb-2 pr-3 border-green-600 hover:bg-green-600 hover:border-white border-double hover:text-black capitalize'>
        {
          account.isConnected ? `${account.status}`  : "Not Connected"
        }
      </div> */}
      <div className=' border-2 rounded-full pl-3 pt-2 pb-2 pr-3 border-green-600 hover:bg-green-600 hover:border-white border-double hover:text-black capitalize'>
        {
          `${data?.formatted? data.formatted : '0.00'} $Celo`
        }
      </div>
    </div>
  )
}

export default Navbar
