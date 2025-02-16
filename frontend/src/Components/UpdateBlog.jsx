import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const UpdateBlog = () => {
    const { id } = useParams()
    const { isLogin } = useContext(AuthContext)
    const [singleBlogData, setSingleBlogData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/getSingleBlog/${id}`)
                console.log(res)
                setSingleBlogData(res.data)
                setTitle(res.data.title)
                setDescription(res.data.description)
                // setImage(res.data.image)
            } catch (error) {
                console.log(err)
            }
        }

        console.log("Single Blog : ", singleBlogData)
        // if (isLogin) {
        fetchData()
        // }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)
            formData.append('image', image)
            const res = await axios.put(`http://localhost:5000/updateBlog/${id}`, formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            console.log(res)
            navigate('/Blogs')
        } catch (error) {
            console.error('Error while updating', error)
        }
    }
    return (
        <div>{
            isLogin ?
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                        <h1 className="text-2xl font-bold mb-4">Update Blog</h1>
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
                                <label className="block text-gray-700">Image</label>
                                <input
                                    type="file"
                                    className="mt-1 p-2 w-full border rounded"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-2 rounded w-full mt-4"
                            >
                                Update
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

export default UpdateBlog

// Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores esse maiores libero, optio ullam numquam fugit consequuntur unde suscipit porro. Quo ab ex facere doloremque excepturi perferendis sint aliquid amet sit adipisci? Autem, ipsa libero, beatae aliquam corporis assumenda architecto dolorem voluptatum voluptate, provident placeat. Optio voluptatibus dolorem, blanditiis similique recusandae, illum sapiente placeat molestiae rerum, sit eveniet? Neque quo reprehenderit officia perferendis, possimus inventore, accusantium nostrum illo velit omnis rerum deserunt? Delectus laboriosam harum, consectetur corrupti incidunt fugit, itaque dignissimos facilis cumque saepe sint animi nisi deleniti at iste maxime iure id necessitatibus architecto repudiandae laborum natus? Necessitatibus, assumenda.