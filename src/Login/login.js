import React, {useState, useEffect, useRef} from 'react';
import styles from './login.module.css'
import {useNavigate} from "react-router-dom";


export function isLoggedIn() {
    return !!localStorage.getItem('refresh_token')
}

export async function refreshToken() {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await fetch('http://localhost:5000/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Token refresh failed: ' + response.statusText);
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        return data.access_token;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function securedFetch(url, options) {
    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
    });

    if (response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
            // Retry the fetch with the new token
            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${newToken}`
                },
            });
        }
    }

    return response;
}

export async function login(email, password) {
    try {
        const response = await securedFetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password}),
        })

        if (!response.ok) {
            throw new Error('Login failed: ' + response.statusText);
        }

        const data = await response.json();
        localStorage.setItem('refresh_token', data.refresh_token);
        const token = data.access_token;
        localStorage.setItem('access_token', token)
        const parsed_token = parseJwt(token);
        // Save the token in localStorage
        console.log(token)
        localStorage.setItem('user_role', parsed_token.roles[0]);
        localStorage.setItem('user_id', parsed_token.sub);

        return true;
    } catch (error) {
        console.error(error)

        return false;
    }
}
const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function Login(){
    // const messages = useRef(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await login(formData.email, formData.password);
        if (result) {
            // messages.current.show({severity: 'success', summary: 'Logged in successfully!'});;
            navigate("/dashboard");
        } else {
            // messages.current.show({severity: 'error', summary: 'Login failed: Check your credentials'});
            console.log('error')
        }
    }

    return(
        <div className = {styles.loginContainer}>
            <div className = {styles.loginPage}>
                <div className={styles.titleContainer}>
                    <h3 className = {styles.loginTitle}>Sign in</h3>
                     <span className = {styles.loginSubTitle}>Sign in to enjoy all the services!</span>
                </div>
            <form onSubmit={handleSubmit} className = {styles.loginForm}>
                <input onChange={handleInputChange} name="email" placeholder="Enter your email" className={styles.loginInput}/>
                <input onChange={handleInputChange} type="password" name="password" placeholder="Enter your password" className={`${styles.loginInput} ${styles.loginPassword}`}/>
                <button type="submit" className = {styles.formButton}>Sign in</button>
            </form>
            </div>
        </div>
    )
}

export default Login
