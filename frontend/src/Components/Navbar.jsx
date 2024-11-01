import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [login, setLogin] = useState(false)
    const { isLogin, setIsLogin, setUserData, userData } = useContext(AuthContext)
    const navigate = useNavigate();

    // console.log(userData._id)
    // userData.forEach(element => {
    //     console.log(element)
    // });

    const handleLogin = () => {
        navigate('/Login')
    };

    const handleLogout = () => {
        setUserData('')
        setIsLogin(false)
        navigate('/')
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-papyrus">
                    <i><b>BlogGie</b></i>
                </Link>
                <div className="hidden md:flex space-x-4 text-white">
                    <Link to="/" className="transition duration-300 hover:text-gray-400">Home</Link>
                    <Link to="/CreateBlog" className="transition duration-300 hover:text-gray-400">Create Blog</Link>
                    <Link to="/Blogs" className="transition duration-300 hover:text-gray-400">My Blogs</Link>
                </div>
                <div className="hidden md:flex items-center">
                    {!isLogin ? (
                        <>
                            <Link to='/Login'
                                onClick={handleLogin}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 transition duration-300 hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-700"
                        >
                            Logout
                        </button>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={!isMenuOpen ? 'M4 6h16M4 12h16m-7 6h7' : 'M6 18L18 6M6 6l12 12'}
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col space-y-4 text-white p-4">
                        <Link to="/" className="transition duration-300 hover:text-gray-400">Home</Link>
                        <Link to="/CreateBlog" className="transition duration-300 hover:text-gray-400">Create Blog</Link>
                        <Link to="/Blogs" className="transition duration-300 hover:text-gray-400">My Blogs</Link>
                        {/* Add more sections here */}
                        {!isLogin ? (
                            <>
                                <button
                                    onClick={handleLogin}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-700"
                                >
                                    Login
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-700"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;