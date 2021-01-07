const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({})
  .populate("blogs");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.password === undefined || body.password === "" ) {
    return response.status(400).json({ error: "password missing" });
  }

  if (body.password.length <= 3) {
    return response.status(400).json({ error: "password too short" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.send(savedUser);
});

module.exports = usersRouter;
