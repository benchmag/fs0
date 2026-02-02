// const express = require('express')
// const mongoose = require('mongoose')

// const app = express()

// const blogSchema = mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
// })

// const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = 'mongodb+srv://bcheeth94_db_user:P3vT1kV5uO1agih3@cluster0.dqimbci.mongodb.net/blogList?appName=Cluster0'
// mongoose.connect(mongoUrl, { family: 4 })

// app.use(express.json())

// app.get('/api/blogs', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog.save().then((result) => {
//     response.status(201).json(result)
//   })
// })

const app = require('./app') // the actual Express application
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})