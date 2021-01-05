const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const { response } = require("express");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("a blog cant be added without title and url", async () => {
  await api.post("/api/blogs").send(helper.oneFaultyBlog).expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a blog added with no likes", async () => {
  const response = await api
    .post("/api/blogs")
    .send(helper.oneBlogWithoutLikes)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const blog = blogsAtEnd.find((blog) => blog.id === response.body.id);
  expect(blog.likes).toEqual(0);
});

test("a valid blog can be added", async () => {
  await api
    .post("/api/blogs")
    .send(helper.oneBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("all blogs have unique 'id' ", async () => {
  const response = await api.get("/api/blogs");
  response.body.map((blog) => expect(blog.id).toBeDefined());
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned notes", async () => {
  const response = await api.get("/api/blogs");
  // console.log(response.body);
  const authors = response.body.map((blog) => blog.author);
  expect(authors).toContain("Michael Chan");
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
