import React from 'react';
import './loadingSpinner.css';

const LoadingSpinner = () => (
    <div className="loading-container">
        <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
        </div>
        <p>Loading...</p>
    </div>
);

export default LoadingSpinner;