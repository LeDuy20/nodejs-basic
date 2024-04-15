const User = require("../models/user");
const { uploadSingleFile ,uploadMultipleFile} = require("../services/fileServices");

const getUsersApi = async (req, res) => {
  let results = await User.find({});

  return res.status(200).json({
    EC: 0,
    data: results,
  });
};

const postCreateUserApi = async (req, res) => {
  const { email, name, city } = req.body;
  let user = await User.create({
    email,
    name,
    city,
  });
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const putUpdateUserApi = async (req, res) => {
  const { email, name, city, userId } = req.body;

  //await handleUpdateUser(email, name, city, userId);
  let user = await User.updateOne({ _id: userId }, { email, name, city });

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const deleteUserApi = async (req, res) => {
  const id = req.body.userId;

  let user = await User.deleteOne({
    _id: id,
  });
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const postUploadSingleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let result = await uploadSingleFile(req.files.image);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};
const postUploadMultipleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  
  if (Array.isArray(req.files.image)) {
    //upload multiple file
    let result = await uploadMultipleFile(req.files.image);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } else {
    //upload single file
    return await postUploadSingleFile(req, res);
  }
};
module.exports = {
  getUsersApi,
  postCreateUserApi,
  putUpdateUserApi,
  deleteUserApi,
  postUploadSingleFile,
  postUploadMultipleFile
};
