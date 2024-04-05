const express = require("express");
const router = express.Router();

const {
  getHomePage,
  postCreateUser,
  getCreatePage,
  getUpdateUser,
  postUpdateUser,
  postDeleteUser,
} = require("../controllers/homeController");

//khai bao router
router.get("/", getHomePage);
router.get("/create", getCreatePage);
router.get("/update/:id", getUpdateUser);
router.post("/create-user", postCreateUser);
router.post("/update-user", postUpdateUser);
router.post("/delete-user/:id", postDeleteUser);

module.exports = router;
