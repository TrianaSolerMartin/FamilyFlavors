import React from "react";
import Nav from "../nav/Nav";
import Footer from "../Footer";
import { Outlet } from 'react-router-dom'

const LayoutPublic = () => {
  return (
    <>
        <Nav />
        <Outlet />
        <Footer />
    </>
  )
}

export default LayoutPublic

