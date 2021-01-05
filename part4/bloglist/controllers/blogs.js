const blogsRouter = require("express").Router();
const _ = require("lodash")

const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response)=>{
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response,next) => {
  const body = request.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });
  const savedBlog = await newBlog.save()
  response.json(savedBlog)

});

module.exports = blogsRouter;
