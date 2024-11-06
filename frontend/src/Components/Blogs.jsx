import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Blogs = () => {
    const { isLogin, userData } = useContext(AuthContext)
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()
    const id = userData?._id

    useEffect(() => {
        if (!id) {
            console.log("ID ERROR")
            return
        }

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/getSingleUser/Blog/${id}`)
                console.log(res.data)
                setBlogs(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        if (isLogin) {
            fetchData()
        }
    }, [isLogin, id])

    const handleDelete = async (blogId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/deleteSingleBlog/${blogId}`)
            if (res.status === 200) {
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId))
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                alert("Error")
            }
            console.log("ERROR : ", err)
        }
    }

    return (
        <div>
            {isLogin ? (
                <div className="min-h-screen bg-gray-100">
                    <main className="p-4">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <Link to={`/ViewBlog/${blog._id}`} key={blog._id}>
                                    <div className="relative bg-white rounded shadow p-4 mb-4">
                                        <div className="absolute right-2 top-2 flex space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleDelete(blog._id)
                                                }}
                                                className="text-red-500 hover:bg-red-200 rounded-md text-sm font-bold p-1"
                                                aria-label="Delete blog"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <Link
                                                to={`/UpdateBlog/${blog._id}`}
                                                className="bg-blue-500 text-white hover:bg-blue-200 rounded-md text-sm font-bold p-1"
                                                aria-label="Update blog"
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Link>
                                        </div>
                                        <h2 className="text-2xl font-bold">{blog.title}</h2>
                                        <p className="mt-2">{blog.description}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                                <div className="bg-red-500 p-8 rounded shadow-md w-full max-w-lg">
                                    <h1 className="text-2xl font-bold mb-4">User Has Not Uploaded Any Blog</h1>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            ) : (
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                        <h1 className="text-2xl font-bold mb-4">Login to Krrr Vroo Pehle</h1>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Blogs
