import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewBlog = () => {
    // console.log(props.id)
    const { id } = useParams()

    const [singleBlog, setSingleBlog] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:5000/getSingleBlog/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setSingleBlog(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        fetchData()
    }, [])

    return (
        <div>
            <div key={singleBlog._id} className="bg-white rounded shadow md:p-4 mb-4">
                <h2 className="text-center text-2xl font-bold">{singleBlog.title}</h2> {/*.user*/}
                <p className="text-right m-3 text-gray-500 text-sm">by {singleBlog.firstName} {singleBlog.lastName}</p>
                <p className="text-center mt-2">{singleBlog.description}</p>
            </div>
        </div>
    )
}

export default ViewBlog