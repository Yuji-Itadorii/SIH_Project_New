import React, { useState } from 'react';
import "./LoginFormNew.css"
import { Link, useNavigate } from 'react-router-dom';

const LoginFormNew = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (res.status === 200) {
                window.alert(data.message)
                navigate('/profile')
            } else {
                window.alert('Some error occured')
            }
        } catch (e) {
            window.alert('Error occured : ' + e)
        }
    }

    return (
        <div className='container'>
            <form className='form-container' method="POST" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Email' required />
                <input type="password" id='password' value={password} onChange={handlePasswordChange} placeholder='Password' required />
                <button className='btn' type="submit">Login</button>
                <p>New here? <Link to="/signup">Signup</Link></p>
            </form>
        </div>
    );
}

export default LoginFormNew;
