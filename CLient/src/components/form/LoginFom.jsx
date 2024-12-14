import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthCOntext';
import { login } from '../../services/UserServices';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(credentials);
        if (response.success) {
            authLogin(response.data);
            navigate('/home');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            />
            <input 
                type="password"
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;