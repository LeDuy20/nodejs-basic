const Customer = require("../models/customer");
const aqp = require("api-query-params");

const createCustomerServices = async (customerData) => {
  try {
    let result = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      description: customerData.description,
      image: customerData.image,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
const createArrayCustomerServices = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.log(">> check error: ", error);
    return null;
  }
};

const getAllUserCustomer = async (limit, page, queryString) => {
  try {
    let result = null;
    if (limit && page) {
      let offset = (page - 1) * limit;
      const { filter } = aqp(queryString);
      delete filter.page;
      result = await Customer.find(filter).skip(offset).limit(limit).exec();
    } else {
      result = Customer.find({});
    }
    return result;
  } catch (error) {
    console.log(">> check error: ", error);
  }
};

const putUpdateCustomerServices = async (name, email, address, id) => {
  try {
    let result = await Customer.updateOne(
      { _id: id },
      { name, email, address }
    );
    return result;
  } catch (error) {
    console.log(">> check error: ", error);
  }
};
const deleteCustomerServices = async (id) => {
  try {
    let result = await Customer.deleteById(id);
    return result;
  } catch (error) {
    console.log(">> check error: ", error);
  }
};

const deleteArrayCustomersServices = async (arrId) => {
  try {
    let result = await Customer.delete({ _id: { $in: arrId } });
    return result;
  } catch (error) {
    console.log(">> check error: ", error);
  }
};
module.exports = {
  createCustomerServices,
  createArrayCustomerServices,
  getAllUserCustomer,
  putUpdateCustomerServices,
  deleteCustomerServices,
  deleteArrayCustomersServices,
};
