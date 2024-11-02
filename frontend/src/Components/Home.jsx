import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

    const [blogs, setBlogs] = useState([])

    // console.log(blogs)
    useEffect(() => {
        const fetchBlog = () => {
            axios.get('http://localhost:5000/getAllBlogs')
                .then((res) => {
                    // console.log("Response : ", res.data)
                    setBlogs(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        fetchBlog()
    }, [])

    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                <main className="p-4">
                    {blogs.map((blog) => (
                        // <h1>{blog.title}</h1>
                        <Link to={`/ViewBlog/${blog._id}`}>
                            <div key={blog._id} className="bg-white rounded shadow md:p-4 mb-4">
                                <h2 className="text-center text-2xl font-bold">{blog.title}</h2>
                                <p className="text-right m-3 text-gray-500 text-sm">by {blog.user.firstName} {blog.user.lastName}</p>
                                <p className="text-center mt-2">{blog.description}</p>
                            </div>
                        </Link>
                    ))}
                </main>

                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; 2024 My Blog. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}

export default Home