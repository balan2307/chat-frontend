import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Layout/Navbar'
import SideBar from '../components/Sidebar'

function Root() {

    
  return (
    <div className="main">
  
    <Navbar></Navbar>
    <SideBar></SideBar>
    <Outlet></Outlet>

      
    </div>
  )
}

export default Root
