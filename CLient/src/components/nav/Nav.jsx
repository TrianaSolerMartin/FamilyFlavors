import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Nav.css';

const Nav = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
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

    const handleAddRecipeClick = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/home/new-recipe' } });
        } else {
            navigate('/home/new-recipe');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
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
                        <Link to={isAuthenticated ? "/home" : "/"} className="nav-link" onClick={toggleMenu}>
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/recipes" className="nav-link" onClick={toggleMenu}>
                            <i className="fas fa-book"></i>
                            <span>Recipes</span>
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link" onClick={toggleMenu}>
                                    <i className="fas fa-user"></i>
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <button 
                            className="nav-link add-recipe" 
                            onClick={handleAddRecipeClick}
                        >
                            <i className="fas fa-plus-circle"></i>
                            <span>Add Recipe</span>
                        </button>
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