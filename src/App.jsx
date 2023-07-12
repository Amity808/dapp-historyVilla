
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AddHistoryModal from '../src/component/AddHistoryModal'
import HistoryList from '../src/component/HistoryList'


function App() {


  return (
    <div className='p-20'>
        {/* <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<History />}  />
        </Routes> */}
        <Home />
        
    </div>
  )
}

export default App
