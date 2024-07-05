import React from 'react';
import './Landig.css'; 

const Landing = () => {
    return (
        <div className="landing-container">
            <div className="header">
                <h1>Welcome to the Recipe App</h1>
                <p>Explore delicious recipes from around the world</p>
            </div>
            <div className="steps-container">
                <div className="step">
                    <div className="step-icon">1</div>
                    <p>Sign up for free</p>
                </div>
                <div className="step">
                    <div className="step-icon">2</div>
                    <p>Browse recipes</p>
                </div>
                <div className="step">
                    <div className="step-icon">3</div>
                    <p>Save your favorites</p>
                </div>
                <div className="step">
                    <div className="step-icon">4</div>
                    <p>Create shopping lists</p>
                </div>
            </div>
            <div className="cta-container">
                <h2>Start cooking today!</h2>
                <button className="signup-button">Sign up now</button>
            </div>
        </div>
    );
};

export default Landing;
