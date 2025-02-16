import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
// brucebanner

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        axios.post('http://localhost:5000/createUser', { firstName, lastName, email, password, confirmPassword })
            .then((res) => {
                console.log("success", res)
                if (res.status === 201) {
                    alert("Registered Successfully")
                    navigate('/login')
                }
            })
            .catch((err) => {
                if (err.response.status === 405) {
                    console.log('Already Exist')
                    alert("User Already Exist Try Logging ")
                    navigate('/login')
                } else {
                    console.log("Error", err)
                }
            })
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium">First Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Last Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md"
                            value={email}
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
                            minLength="6"
                            maxLength="10"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <button
                        type="submit"
                        className="mt-10 w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to='/Login'
                            // onClick={setIsLoggedIn(true)}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
