import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
                        <div key={blog._id} className="bg-white rounded shadow p-4 mb-4">
                            <h2 className="text-2xl font-bold">{blog.title}</h2>
                            <p className="text-gray-600 text-sm"><b></b>by {blog.user.firstName} {blog.user.lastName}</p>
                            <p className="mt-2">{blog.description}</p>
                        </div>
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