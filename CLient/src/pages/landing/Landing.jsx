import React from 'react';
import { Link } from 'react-router-dom';
import './Landig.css';
import backgroundVideo from '../../../assets/video/home_video.mp4';

const Landing = () => {
    return (
        <div className="landing-container">
            <video 
                autoPlay 
                loop 
                muted 
                className="video-background"
            >
                <source src={backgroundVideo} type="video/mp4" />
            </video>            <div className="hero-section">
                <h1>Family Flavors</h1>
                <p>Comparte y descubre recetas familiares</p>
                <div className="auth-buttons">
                    <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
                    <Link to="/register" className="btn-secondary">Registrarse</Link>
                </div>
            </div>
            <div className="features-section">
                <div className="feature-card">
                    <i className="fas fa-book-open"></i>
                    <h3>Recetas Familiares</h3>
                    <p>Preserva las recetas de tu familia</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-share-alt"></i>
                    <h3>Comparte</h3>
                    <p>Comparte tus recetas con otros</p>
                </div>
                <div className="feature-card">
                    <i className="fas fa-heart"></i>
                    <h3>Descubre</h3>
                    <p>Encuentra nuevas recetas</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;