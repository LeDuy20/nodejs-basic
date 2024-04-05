const connection = require("../config/database");

const getAllUsers = async () => {
  let [results, fields] = await connection.query(`select * from Users`);
  return results;
};
const updateUser = async (userId) => {
  let [results, fields] = await connection.query(
    `select * from Users where id = ? `,
    [userId]
  );
  return results;
};
const handleUpdateUser = async (email, name, city, userId) => {
  const [results, fields] = await connection.query(
    `UPDATE Users
    SET email = ? , name= ? , city = ?
    WHERE id = ?`,
    [email, name, city, userId]
  );
};

const handleDeleteUser = async (userId) => {
  const [results, fields] = await connection.query(
    `DELETE FROM Users WHERE id = ?`,
    [userId]
  );
  return results;
};
module.exports = {
  getAllUsers,
  updateUser,
  handleUpdateUser,
  handleDeleteUser,
};
