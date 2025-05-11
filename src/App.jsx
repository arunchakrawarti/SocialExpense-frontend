
import { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import { useState } from 'react'

function App() {
  let details = JSON.parse(localStorage.getItem('expenseLogin'));
  console.log(details)
  const [login, setlogin] = useState(false);
  console.log(login)


  return (
    <>
     <BrowserRouter>
     <Navbar login={login}/>
     <Routes>
      <Route path='/' element={login===true?<Home/>:<Navigate to={"/login"}/>}/>
      <Route path='/login' element={login===false?<Login setlogin={setlogin}/>:<Navigate to={"/"}/>}/>
      <Route path='/register' element={login===false?<Signup/>:<Navigate to={"/"}/>}/>
     </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
