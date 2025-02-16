import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserData, userData, setIsLogin } = useContext(AuthContext)
    // userData setBtnLogin
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/loginUser", { email, password })
            .then(((response) => {
                console.log(response)
                if (response.status === 200) {
                    setUserData(response.data)
                    setIsLogin(true)
                    console.log("Response Data : ", response.data)
                    alert("Logged In Successfully")
                    navigate('/')
                }
            }))
            .catch((err) => {
                if (err.response.status === 404) {
                    alert("No Such User Exist")
                    navigate('/register')
                } else if (err.response.status === 401) {
                    console.log("Incorrect Password  ", err.response)
                    alert("Incorrect Password")
                }
                console.log(err)
            })
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md"
                            value={email}
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to='/Register'
                            className="text-blue-500 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
