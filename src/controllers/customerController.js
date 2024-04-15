const { uploadSingleFile } = require("../services/fileServices");
const {
  createCustomerServices,
  createArrayCustomerServices,
  getAllUserCustomer,
  putUpdateCustomerServices,
  deleteCustomerServices,
  deleteArrayCustomersServices,
} = require("../services/customerServices");


module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;

    let imageUrl = "";

    if (!req.files || Object.keys(req.files).length === 0) {
      //do nothing
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageUrl = result.path;
    }
    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };
    let customer = await createCustomerServices(customerData);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  postCreateArrCustomer: async (req, res) => {
    let arr = req.body.customers;
    let arrCustomer = await createArrayCustomerServices(arr);
    if (createArrayCustomerServices) {
      return res.status(200).json({
        EC: 0,
        data: arrCustomer,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: arrCustomer,
      });
    }
  },
  getAllUserCustomers: async (req, res) => {  
    let limit = req.query.limit;
    let page = req.query.page;
    let result = null;
    if (limit && page) {
      result = await getAllUserCustomer(limit, page, req.query);
    } else {
      result = await getAllUserCustomer();
    }
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putUpdateCustomer: async (req, res) => {
    const { name, email, address, id } = req.body;
    let result = await putUpdateCustomerServices(name, email, address, id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteCustomer: async (req, res) => {
    let id = req.body.id;
    let result = await deleteCustomerServices(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteCustomersMany: async (req, res) => {
    let arrId = req.body.customersId;
    let result = await deleteArrayCustomersServices(arrId);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
