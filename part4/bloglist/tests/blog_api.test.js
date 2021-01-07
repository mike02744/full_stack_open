const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const userHelper = require("./user_helper");

const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {

    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned notes", async () => {
    const response = await api.get("/api/blogs");
    const authors = response.body.map((blog) => blog.author);
    expect(authors).toContain("Michael Chan");
  });

  test("all blogs have unique 'id' ", async () => {
    const response = await api.get("/api/blogs");
    response.body.map((blog) => expect(blog.id).toBeDefined());
  });
});

describe("addition of a new blog", () => {
  test("a blog added with no likes", async () => {
 await api
      .post("/api/users")
      .send(userHelper.userTim)
      .expect(200);

    const res = await api.post("/api/login").send({
      username: userHelper.userTim.username,
      password: userHelper.userTim.password,
    });
    const token = res.body.token.toString();

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(helper.oneBlogWithoutLikes)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const blog = blogsAtEnd.find((blog) => blog.id === response.body.id);
    expect(blog.likes).toEqual(0);
  });

  test("a valid blog can be added", async () => {
 await api
      .post("/api/users")
      .send(userHelper.userTim)
      .expect(200);

    const res = await api.post("/api/login").send({
      username: userHelper.userTim.username,
      password: userHelper.userTim.password,
    });
    const token = res.body.token.toString();

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(helper.oneBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("a blog cant be added without title and url", async () => {
    await api
    .post("/api/users")
    .send(userHelper.userTim)
    .expect(200);

  const resp = await api.post("/api/login").send({
    username: userHelper.userTim.username,
    password: userHelper.userTim.password,
  });
  const token = resp.body.token.toString();

    await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(helper.oneFaultyBlog).expect(400);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("delete of a blog", () => {
  test("a blog is deleted with proper id", async () => {
    const respond = await api
      .post("/api/users")
      .send(userHelper.userTim)
      .expect(200);

    const resp = await api.post("/api/login").send({
      username: userHelper.userTim.username,
      password: userHelper.userTim.password,
    });
    const token = resp.body.token.toString();

    const res = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(helper.oneBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogToDelete = res.body;

    const blogsAtBeginning = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(blogsAtBeginning.length - 1);

  });
});
describe("update of a blog", () => {
  test("a blog is updated with proper id", async () => {
    const blogsAtBeginning = await helper.blogsInDb();

    const blogToUpdate = blogsAtBeginning[0];

    const respond = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(helper.oneBlogWithoutLikes);

    const blogUpdated = respond.body;

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(blogsAtBeginning.length);

    expect(blogsAtBeginning).toContainEqual(blogToUpdate);
    expect(blogsAtBeginning).not.toContainEqual(blogUpdated);

    expect(blogsAtEnd).not.toContainEqual(blogToUpdate);
    expect(blogsAtEnd).toContainEqual(blogUpdated);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
