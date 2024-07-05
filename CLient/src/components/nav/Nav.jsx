import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; 

const Nav = () => {
    return (
        <nav className="navbar">
            <ul className="nav-menu">
                <li className="nav-item">
                    <Link to="/home" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">Landing</Link>
                </li>
                <li className="nav-item">
                    <Link to="recipeForm" className="nav-link">Add recipe</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
