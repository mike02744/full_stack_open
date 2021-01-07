const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./user_helper");

const Blog = require("../models/blog");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});

describe("when there is no user exists", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("should be able to add a valid user", async () => {
    const res = await api
      .post("/api/users")
      .send(helper.userTim)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toContainEqual(res.body);
  });
});



afterAll(() => {
  mongoose.connection.close();
});
