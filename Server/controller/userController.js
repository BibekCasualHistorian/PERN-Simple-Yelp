const pool = require("../connectDb/connectDb");
const {
  getUserByIdQuery,
  getAllUsersQuery,
  addUserQuery,
  deleteUserQuery,
  doesUserExistsQuery,
  udpateUserQuery,
} = require("../queries/queries");

const allUsers = async (req, res) => {
  try {
    await pool.query(getAllUsersQuery, (err, results) => {
      if (err) {
        console.log(err);
        throw Error();
      } else {
        return res.status(200).json(results.rows);
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    await pool.query(getUserByIdQuery, [id], (error, results) => {
      console.log("error", error);
      console.log("results", results);
      if (error) {
        throw Error;
      } else if (results.rowCount > 0) {
        return res.status(200).json(results);
      } else {
        return res.status(400).json({ status: "no such user exists" });
      }
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  console.log("req.body", req.body);
  const { name, email, password, photo, phone } = req.body;
  try {
    pool.query(doesUserExistsQuery, [email], (error, results) => {
      if (error) {
        throw Error(error);
      }
      // check whether email already exists or not
      if (results.rowCount) {
        return res.status(400).json({ status: "Email already exists" });
      }
      // if email doesn't exists
      pool.query(
        addUserQuery,
        [name, email, password, photo, phone],
        (error, results) => {
          if (error) {
            throw Error(error);
          }
          return res.status(200).json(results);
        }
      );
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    pool.query(getUserByIdQuery, [id], (err, results) => {
      console.log("results", results);
      if (!results.rowCount) {
        return res.status(200).json({ status: "User doesn't exists" });
      }
      pool.query(deleteUserQuery, [id], (error, results) => {
        if (error) {
          throw Error(error);
        }
        return res.status(200).json({ status: "User Deleted Successfully" });
      });
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    pool.query(getUserByIdQuery, [id], (err, results) => {
      if (err) {
        throw Error(err);
      }
      if (!results.rowCount) {
        throw Error("There is no such user");
      }
      pool.query(udpateUserQuery, [name, id], (error, results) => {
        if (error) {
          throw Error(error);
        }
        return res.status(200).json(results);
      });
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { allUsers, getUserById, addUser, deleteUser, updateUser };
