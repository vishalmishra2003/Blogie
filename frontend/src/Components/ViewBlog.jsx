import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewBlog = () => {
    const { id } = useParams()

    const [singleBlog, setSingleBlog] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/getSingleBlog/${id}`)
                setSingleBlog(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])
    return (
        <div>
            <div key={singleBlog._id} className="bg-white rounded shadow md:p-4 mb-4">
                <h2 className="text-center text-2xl font-bold">{singleBlog.title}</h2>
                <img src={`http://localhost:5000/uploads/${singleBlog.image}`}
                    className="img-fluid rounded shadow-sm border-0 mx-auto d-block max-w-md"
                    alt="Image Not Found" />
                <p className="text-right m-3 text-gray-500 text-sm">by {singleBlog.user?.firstName} {singleBlog.user?.lastName}</p>
                <p className="text-center mt-2">{singleBlog.description}</p>
            </div>
        </div>
    )
}

export default ViewBlog