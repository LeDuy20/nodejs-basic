const connection = require("../config/database");
const {
  getAllUsers,
  updateUser,
  handleUpdateUser,
  handleDeleteUser,
} = require("../services/CRUDServices");
const User = require("../models/user");

const getHomePage = async (req, res) => {
  let results = await User.find({});
  return res.render("home.ejs", { listUser: results });
};
const postCreateUser = async (req, res) => {
  const { email, name, city } = req.body;
  await User.create({
    email,
    name,
    city,
  });
  res.redirect("/");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdateUser = async (req, res) => {
  const userId = req.params.id;
  //const [results, fields] = await updateUser(userId);
  const user = await User.findById(userId).exec();

  res.render("edit.ejs", { userById: user });
};

const postUpdateUser = async (req, res) => {
  const { email, name, city, userId } = req.body;

  //await handleUpdateUser(email, name, city, userId);
  await User.updateOne({ _id: userId }, { email, name, city });

  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  res.render("delete.ejs", { userById: user });
};
const postHandleRemove = async (req, res) => {
  const id = req.body.userId;
  console.log(id);
  // await handleDeleteUser(userId);
  await User.deleteOne({ id });
  res.redirect("/");
};
module.exports = {
  getHomePage,
  postCreateUser,
  getCreatePage,
  getUpdateUser,
  postUpdateUser,
  postDeleteUser,
  postHandleRemove,
};
