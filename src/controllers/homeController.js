const connection = require("../config/database");
const {
  getAllUsers,
  updateUser,
  handleUpdateUser,
  handleDeleteUser,
} = require("../services/CRUDServices");

const getHomePage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUser: results });
};
const postCreateUser = async (req, res) => {
  const { email, name, city } = req.body;

  const [results, fields] = await connection.query(
    `INSERT INTO Users (email, name, city) VALUES (?, ? , ?);`,
    [email, name, city]
  );

  res.redirect("/");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdateUser = async (req, res) => {
  const userId = req.params.id;
  const [results, fields] = await updateUser(userId);

  res.render("edit.ejs", { userById: results });
};

const postUpdateUser = async (req, res) => {
  const { email, name, city, userId } = req.body;

  await handleUpdateUser(email, name, city, userId);

  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  const [results, fields] = await updateUser(userId);
  
  res.render('delete.ejs',{ userById: results })

  await handleDeleteUser(userId);

  res.render("/");
};
module.exports = {
  getHomePage,
  postCreateUser,
  getCreatePage,
  getUpdateUser,
  postUpdateUser,
  postDeleteUser,
};
