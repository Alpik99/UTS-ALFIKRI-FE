import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div >
        <Sidebar />
        <div className="allhome">
            <div className="judulHome ">
                <p>Selamat Datang Di Web</p>
                <h2 >Jakarta Medicine Center</h2>
            </div>
            <div className="btnHome">
                <Link to="/obat" className='button'>Lihat Data Obat</Link>
            </div>
        </div>        
    </div>
  )
}

export default Home