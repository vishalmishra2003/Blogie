import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    // const [user, setUser] = useState('')
    const { isLogin, userData } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userData)
        const { _id } = userData
        console.log(_id)
        axios.post('http://localhost:5000/createBlog', { title, description, image, _id })
            .then((res) => {
                // console.log("ID : ", id)
                // console.log(res)
                navigate('/blogs')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>{
            isLogin ?
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                        <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 w-full border rounded"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    className="mt-1 p-2 w-full border rounded"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">image</label>
                                <input
                                    type="Text"
                                    className="mt-1 p-2 w-full border rounded"
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-2 rounded w-full mt-4"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div> :
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                        <h1 className="text-2xl font-bold mb-4">Login to Krrr Vroo Pehle</h1>
                    </div>
                </div>
        }
        </div>
    )
}

export default CreateBlog
