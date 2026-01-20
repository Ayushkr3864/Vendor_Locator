import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router'

function Layout() {
  return (
      <>
          <Navbar />
          <Outlet />
      </>
  )
}

export default Layout