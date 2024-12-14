import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/" className="nav-brand">
                        <span className="brand-text">Family</span>
                        <span className="brand-accent">Flavors</span>
                    </Link>
                </div>
                
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/home" className="nav-link" onClick={toggleMenu}>
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={toggleMenu}>
                            <i className="fas fa-globe"></i>
                            <span>Explore</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/home/new-recipe" className="nav-link add-recipe" onClick={toggleMenu}>
                            <i className="fas fa-plus-circle"></i>
                            <span>Add Recipe</span>
                        </Link>
                    </li>
                </ul>

                <button className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Nav;