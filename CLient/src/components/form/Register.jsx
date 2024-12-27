import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/UserServices';
import './form.css';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
    
        try {
            // Form validation
            if (!validateForm()) {
                setError('Por favor, completa todos los campos requeridos');
                return;
            }
    
            const response = await register(userData);
            
            if (response.success) {
                navigate('/login');
            } else {
                // Handle specific error responses
                if (response.status === 400) {
                    setError('Por favor, verifica la información ingresada');
                } else {
                    setError(response.error || 'Error en el registro');
                }
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setError('Datos de registro inválidos');
            } else {
                setError('Error de conexión');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const validateForm = () => {
        return userData.email && 
               userData.password && 
               userData.username && 
               userData.password.length >= 6;
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Crear Cuenta</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            value={userData.username}
                            onChange={(e) => setUserData({...userData, username: e.target.value})}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={userData.password}
                            onChange={(e) => setUserData({...userData, password: e.target.value})}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                <p className="auth-redirect">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;