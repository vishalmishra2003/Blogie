const { default: mongoose, isValidObjectId } = require('mongoose')
const blogSchema = require('../Model/blogSchema')
const userSchema = require('../Model/userSchema')

const newBlog = async (req, res) => {
    const { title, description, image, _id } = req.body;

    let existingUser;
    const user = _id;
    console.log(req.body)
    // console.log(_id)
    try {
        if (!isValidObjectId(_id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        existingUser = await userSchema.findById(user).populate('blog');

        if (!existingUser) {
            return res.status(404).json({ message: "No Such User by this ID" });
        }

        const existingBlog = existingUser.blog.find(blog => blog.title === title);

        if (existingBlog) {
            return res.status(400).json({ message: "Blog Already Exists for this User" });
        }

        const createBlog = new blogSchema({ title, description, image, user });

        await createBlog.save();

        existingUser.blog.push(createBlog);
        await existingUser.save();

        return res.status(201).json({ message: "Successful", blog: createBlog });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while creating the blog" });
    }
};


const getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await blogSchema.find().populate('user')
        // console.log("",allBlogs)
        // allBlogs.map(blog => {
        //     // const isFname = blog.user.firstName ? blog.user.firstName : ""
        //     console.log(blog.user)
        // })

        res.status(200).json(allBlogs)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Couldn't get all blogs" })
    }
}

const getSingleBLog = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(404).json({ message: "No Such Blog Exist" })
        }

        const singleBlog = await blogSchema.findById(id).populate("_id")

        console.log(singleBlog)

        res.status(200).json(singleBlog)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error while fetching single blog" })
    }
}

const deleteSingleBlog = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(400).json({ message: "Invalid ID for Deleting" })
        }

        const deleteBlog = await blogSchema.findByIdAndDelete(id).populate("_id")

        await deleteBlog.user.blog.pull(deleteBlog)
        await deleteBlog.user.save()

        res.status(200).json(deleteBlog)
        console.log(deleteBlog)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error While Deleting Blog" })
    }
}

const updateBlog = async (req, res) => {
    const { id } = req.params
    const { title, description, image, _id } = req.body
    try {
        if (!id) {
            return res.status(400).json({ message: "Invalid Id to Update" })
        }
        const updatedBlog = await blogSchema.findByIdAndUpdate({ _id: _id }, {
            title: title,
            description: description,
            image: image,
            user: user
        })
        res.status(200).json(updatedBlog)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Failed while updating blog" })
    }
}


module.exports = { newBlog, getAllBlogs, getSingleBLog, deleteSingleBlog, updateBlog }