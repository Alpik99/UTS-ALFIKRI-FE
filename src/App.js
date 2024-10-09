import React from 'react'
// import Sidebar from './components/Sidebar'
// import Obat from './pages/Obat'
// import Home from './pages/Home'
// import Customer from './pages/Customer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './layout/Homepage'
import Home from './pages/Home'
import Obat from './pages/Obat'
import Customers from './pages/Customers'

const App = () => {
  return (
    <BrowserRouter basename='/UTS-ALFIKRI-FE/'>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/obat' element={<Obat/>}/>
        <Route path='/customer' element={<Customers/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App