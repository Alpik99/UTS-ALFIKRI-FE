import React from 'react'
import './sidebar.css'
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div>
        <div className='navbar'>
            <div className="logo">
                <h2>Medicine Center</h2>
            </div>
            <ul>
                <li>
                    <Link to="/home">HOME</Link>
                </li>
                <li>
                    <Link to="/obat">OBAT</Link>
                </li>
                <li>
                    <Link to="/customer">CUSTOMER</Link>
                </li>
                <li>
                    <a href="#">TRANSAKSI</a>
                </li>
                <li>
                    <a href="#">PEMASOK</a>
                </li>
            </ul>
            <button className='btnUsr'>User 1</button>
        </div>
    </div>
  )
}

export default Sidebar