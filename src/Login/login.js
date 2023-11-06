import React, {useState, useEffect, useRef} from 'react';
import styles from './login.module.css'
import {useNavigate} from "react-router-dom";


export function isLoggedIn() {
    return !!localStorage.getItem('refresh_token')
}
export async function login(email, password) {
    try {
        const response = await fetch('http://127.0.0.1:5000/auth/login', {
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
        const parsed_token = parseJwt(token);
        // Save the token in localStorage
        console.log(parsed_token)
        localStorage.setItem('user_role', parsed_token.roles[0]);
        localStorage.setItem('user_id', parsed_token.sub);

        console.log('123')
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
            console.log('erorr')
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
                <input onChange={handleInputChange} type="text" name="email" placeholder="Enter your email" className={styles.loginInput}/>
                <input onChange={handleInputChange} type="password" name="password" placeholder="Enter your password" className={`${styles.loginInput} ${styles.loginPassword}`}/>
                <button className = {styles.formButton}>Sign in</button>
            </form>
            </div>
        </div>
    )
}

export default Login
