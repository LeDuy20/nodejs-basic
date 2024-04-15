const express = require("express");
const routerApi = express.Router();
const {
  getUsersApi,
  postCreateUserApi,
  putUpdateUserApi,
  deleteUserApi,
  postUploadSingleFile,
  postUploadMultipleFile,
} = require("../controllers/apiController");
const {
  postCreateCustomer,
  postCreateArrCustomer,
  getAllUserCustomers,
  putUpdateCustomer,
  deleteCustomer,
  deleteCustomersMany,
} = require("../controllers/customerController");

routerApi.get("/users", getUsersApi);
routerApi.post("/users", postCreateUserApi);
routerApi.put("/users", putUpdateUserApi);
routerApi.delete("/users", deleteUserApi);

routerApi.post("/file", postUploadSingleFile);
routerApi.post("/files", postUploadMultipleFile);

routerApi.post("/customer", postCreateCustomer);
routerApi.post("/customers-many", postCreateArrCustomer);
routerApi.get("/customer", getAllUserCustomers);
routerApi.put("/customer", putUpdateCustomer);
routerApi.delete("/customer", deleteCustomer);
routerApi.delete("/customers-many", deleteCustomersMany);

module.exports = routerApi;
