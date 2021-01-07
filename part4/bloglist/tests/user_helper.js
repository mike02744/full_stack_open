const blog = require("../models/blog");
const User = require("../models/user");

const userMike = {
  username: "mike3212",
  user: "michael jackson",
  password: "12345678",
};

const userTim = {
  username: "tim312",
  user: "tim horton",
  password: "12345678",
};

const initialUsers = [
  {
    username: "alice",
    user: "alice horton",
    password: "12345678",
  },
  {
    username: "bob",
    user: "bob horton",
    password: "12345678",
  },
];

const existingId = async () => {
  const user = new User({
    username: "alexa",
    user: "alexa horton",
    password: "12345678",
  });
  const response = await user.save();

  return response.body.id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  // timId,
  existingId,
  userTim,
  userMike,
  usersInDb,
  initialUsers,
};
