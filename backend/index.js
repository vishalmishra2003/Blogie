require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const route = require('./Router/router')
const cors = require('cors')
const app = express()

const DB = process.env.URL; //mongodb+srv://vishalmishra7112003:vishalmishra7112003@blogpage.kq5r9mf.mongodb.net/Blog
const PORT = process.env.PORT //5000

app.use(cors())
app.use(express.json())
app.use(express.static('Assets'))

app.use(route)

mongoose.connect(DB)
    .then(() => { console.log("Connected to Database") })
    .catch((err) => { console.log(err) })


app.listen(PORT, () => {
    console.log("Listening to", PORT)
})