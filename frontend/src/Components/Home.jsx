import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlog = async () => {
            await axios.get('http://localhost:5000/getAllBlogs')
                .then((res) => {
                    console.log("Response : ", res.data)
                    console.log("Blogs Length :", blogs.length)
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
                <main className="p-4" >
                    {
                        blogs.length > 0 ?
                            (
                                blogs.map((blog) => (
                                    <Link to={`/ViewBlog/${blog._id}`} key={blog._id}>
                                        <div className="bg-white rounded shadow md:p-4 mb-4">
                                            <h2 className="text-center text-2xl font-bold">{blog.title}</h2>
                                            <p className="text-right m-3 text-gray-500 text-sm">by {blog.user.firstName} {blog.user.lastName}</p>
                                            <img src={`http://localhost:5000/uploads/${blog.image}`}
                                                className="img-fluid rounded shadow-sm border-0 mx-auto d-block max-w-md"
                                                alt="Image Not Found" />
                                            <p className="text-center mt-2">{blog.description}</p>
                                        </div>
                                    </Link>
                                ))
                            ) :
                            <h1 className='text-center text-bold'>No Blog in Database</h1>
                    }
                </main>

                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; 2024 My Blog. All rights reserved.</p>
                </footer>
            </div>
        </div >
    )
}

export default Home