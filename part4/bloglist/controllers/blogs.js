const blogsRouter = require("express").Router();
const { response } = require("express");
const _ = require("lodash");
const { request } = require("../app");

const Blog = require("../models/blog");
const { blogsInDb } = require("../tests/test_helper");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });
  const savedBlog = await newBlog.save();
  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(blogUpdated);
});

module.exports = blogsRouter;
