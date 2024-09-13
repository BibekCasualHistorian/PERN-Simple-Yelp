const {
  allUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");

const router = require("express").Router();

router.get("/", allUsers);

router.get("/:id", getUserById);

router.post("/", addUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
