import React from "react";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../utils/loadingSpinner/loadingSpinner';
import './Layout.css';

const LayoutPrivate = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="layout">
      <Nav />
      <main className="main-content private">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPrivate;