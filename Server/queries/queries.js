const getAllUsersQuery = "Select * from Users";
const getUserByIdQuery = "Select * from Users where user_id = $1";
const doesUserExistsQuery = "Select * from Users where email = $1";
const addUserQuery =
  "Insert into users(name, email, password, photo, phone) values($1, $2, $3, $4, $5) ";

const deleteUserQuery = "Delete from users where user_id = $1";

const udpateUserQuery = "Update users set name = $1 where id = $2";

module.exports = {
  getAllUsersQuery,
  getUserByIdQuery,
  doesUserExistsQuery,
  addUserQuery,
  udpateUserQuery,
  deleteUserQuery,
};
