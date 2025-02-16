const userSchema = require('../Model/userSchema')
const express = require('express')
const route = express.Router()
const { signUp, loginUser, getAllUser, getSingleUser, getUserBlog } = require('../Controller/userController')
const { newBlog, getAllBlogs, getSingleBLog, deleteSingleBlog, updateBlog } = require('../Controller/blogController')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        return cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })
route.use(express.json())

// New User 
route.post('/createUser', signUp)

// Existing User
route.post('/loginUser', loginUser)

// Fetch All Userdata
route.get('/getUserData', getAllUser)

// Fetch Data of Single User
route.get('/getSingleUser/:id', getSingleUser)

// New Blog
route.post('/createBlog', upload.single('image'), newBlog)

// Fetch all Blogs
route.get('/getAllBlogs', getAllBlogs)

// Fetch Single Blog
route.get('/getSingleBlog/:id', getSingleBLog)

//Get Blog of Single User
route.get('/getSingleUser/Blog/:id', getUserBlog)

// Delete Single Blog
route.delete('/deleteSingleBlog/:id', deleteSingleBlog)

// Update Single Blog
route.put('/updateBlog/:id', updateBlog)

module.exports = route;