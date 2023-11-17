import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Layout/Navbar'
import SideBar from '../components/Sidebar'

function RootChat() {
  return (
    <>
    <Navbar></Navbar>
    <SideBar></SideBar>

    <Outlet></Outlet>

      
    </>
  )
}


export default RootChat
