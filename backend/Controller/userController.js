const userSchema = require('../Model/userSchema')
const express = require('express')
const route = express.Router()
const bcrypt = require('bcrypt')

route.use(express.json())

const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    // userName,
    try {
        const existingUser = await userSchema.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "User Already Exist" })
        }

        if (password != confirmPassword) {
            return res.status(400).json({ message: "Confirm Password Do Not Match" })
        }

        // const hashed = await bcrypt.hash(password, 10)

        const newUser = new userSchema({ firstName, lastName, email, password, blogs: [] }) //userName, : hashed
        await newUser.save()
        res.status(201).json(newUser)
        console.log(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error" })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await userSchema.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({ message: "No Such User in Database" })
        }

        console.log("Existing User Password : ", existingUser.password)


        const tempPassword = (existingUser.password === password) ? true : false  //bcrypt.compareSync(password, existingUser.password)

        console.log("Password : ", existingUser.password)
        // console.log("Temp Password : ", tempPassword)

        if (tempPassword) {
            return res.status(200).json(existingUser)
        } else {
            return res.status(401).json({ message: "Incorrect Password Couldn't Login" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error While Login" })
    }
}

const getAllUser = async (req, res) => {

    try {
        const userData = await userSchema.find().populate("blog")
        res.status(200).json(userData)
        console.log(userData)
    } catch (error) {
        console.log(error)
    }
}

const getSingleUser = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(400).json({ message: "NO SUCH USER" })
        }

        console.log(typeof id)

        const singleUser = await userSchema.findById(id).populate("blog")

        if (!singleUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        return res.status(200).json(singleUser)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error While fetching single user Data" })
    }
}

const getUserBlog = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(404).json({ message: "No Such User" })
        }

        const userBlog = await userSchema.findById(id).populate("blog")

        const blogsArray = userBlog.blog.map((blog) => ({
            ...blog.toObject(), // Convert Mongoose document to plain JavaScript object
            _id: blog._id.toString() // Ensure _id is a string
        }));

        console.log(blogsArray)
        // Send a single response with all blogs
        return res.status(200).json(blogsArray);

    } catch (error) {
        console.log("Something Wrong Here ", error)
        return res.status(500).json({ message: "Error" })
    }
}

module.exports = { signUp, loginUser, getAllUser, getSingleUser, getUserBlog }