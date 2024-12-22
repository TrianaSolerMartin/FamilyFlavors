import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../services/UserServices';
import './form.css';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
    
        try {
            const response = await login(credentials);
            if (response.success) {
                authLogin(response.data);
                navigate('/home/recipes/new'); 
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Iniciar Sesión</h2>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                email: e.target.value
                            })}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={credentials.password}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                password: e.target.value
                            })}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                
                <p className="auth-redirect">
                    ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;