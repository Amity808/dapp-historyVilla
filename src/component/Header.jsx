import React from 'react'
import Navbar from './Navbar'
import sideImg from '../assets/library.jpg';

const Header = () => {
  return (
    <div className='imagebg'>
      <Navbar />
      <div className='mt-16 flex justify-center items-center'><span className=' text-green-500 text-4xl font-bold pb-3'>Can There Be Objectivity In History ?</span></div>
      <div className='mt-20 flex flex-row justify-between items-center max-sm:flex max-sm:flex-col'>
        <h1 className='text-3xl capitalize max-md:text-lg'><br /> Surely With Blockchain We Can Achieve History. <br /> We can not change the past <br /> But we can change the future Through the lesson from the past</h1>
        <div className=' w-2/3 h-full'>
          <img src={sideImg} alt="history objectivity" className=' border-2 border-green-700 border-double max-sm:mt-10 w-full h-full' />
        </div>
      </div>
    </div>
  )
}

export default Header
