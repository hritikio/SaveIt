import { useState } from 'react'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


function App() {
 return(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
  </BrowserRouter>
 )
  
  
}

export default App
