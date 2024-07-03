// src/components/layout/LayoutPublic.jsx
import React from "react";
import Nav from "../Nav";
import Footer from "../Footer";

const LayoutPublic = ({ children }) => {
  return (
    <div>
      <header>
        <Nav/>
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LayoutPublic;
