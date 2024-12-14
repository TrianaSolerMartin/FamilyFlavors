import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; 

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/" className="nav-link">MyApp</Link>
                </div>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/home" className="nav-link" onClick={toggleMenu}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={toggleMenu}>Landing</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/home/new-recipe" className="nav-link" onClick={toggleMenu}>
        Add Recipe
    </Link>                    </li>
                </ul>
                <div className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="nav-toggle-bar"></span>
                    <span className="nav-toggle-bar"></span>
                    <span className="nav-toggle-bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Nav;