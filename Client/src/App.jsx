import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Profile from './pages/Profile'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div className="bg-[url('./src/assets/bgImage.jpg')] bg-contain">
        <Toaster/>
        <Routes>
           <Route path='/' element={<HomePage/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </div>
  )
}

export default App
