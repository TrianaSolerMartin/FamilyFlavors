import React from "react";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import { Outlet } from 'react-router-dom';
import './Layout.css';

const LayoutPublic = () => {
  return (
    <div className="layout">
      <Nav />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPublic;