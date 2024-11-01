import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const Blogs = () => {
    const { isLogin, userData } = useContext(AuthContext)
    const [blogs, setBlogs] = useState([])

    const id = userData._id

    useEffect(() => {
        if (!id) { return console.log("ID ERROR") }
        const fetchData = () => {
            axios.get(`http://localhost:5000/getSingleUser/Blog/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setBlogs(res.data)
                    // console.log(blogs)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        console.log("Blog Length: ", blogs.length)
        if (isLogin) {
            fetchData()
        }

    }, [])

    return (
        <div>
            {
                isLogin ?
                    <div className="min-h-screen bg-gray-100">
                        <main className="p-4">
                            {blogs.length > 0 ?
                                (
                                    blogs.map((blog) => (
                                        <div key={blog._id} className="relative bg-white rounded shadow  p-4 mb-4">
                                            <div className='relative'>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="absolute bg-red-500 right-2 text-white rounded-md text-sm font-bold p-1"
                                                    aria-label="Delete blog"
                                                >
                                                    ✕
                                                </button>
                                                <h2 className="text-2xl font-bold">{blog.title}</h2>
                                            </div>
                                            {/* <FontAwesomeIcon icon="fa-regular fa-trash-can" /> */}
                                            <p className="mt-2">{blog.description}</p>
                                        </div>
                                        // <div key={blog._id} className="bg-white rounded shadow p-4 mb-4">
                                        //     <button
                                        //         onClick={() => handleDelete(blog._id)}
                                        //         className="top-2 right-2 text-red-500 text-sm font-bold p-1"
                                        //         aria-label="Delete blog"
                                        //     >
                                        //         ✕
                                        //     </button>
                                        //     <h2 className="text-2xl font-bold">{blog.title}</h2>
                                        //     {/* <p className="text-gray-600 text-sm"><b></b>by {blog.user.firstName} {blog.user.lastName}</p> */}
                                        //     <p className="mt-2">{blog.description}</p>
                                        // </div>
                                    ))
                                ) : <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                                    <div className="bg-red-500 p-8 rounded shadow-md w-full max-w-lg">
                                        <h1 className="text-2xl font-bold mb-4">User Have Not Uploaded any Blog</h1>
                                    </div>
                                </div>
                            }
                        </main>
                    </div>
                    : <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                            <h1 className="text-2xl font-bold mb-4">Login to Krrr Vroo Pehle</h1>
                        </div>
                    </div>
            }
        </div>

    )
}

export default Blogs