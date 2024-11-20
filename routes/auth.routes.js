const Router = require("express");
const router = Router();

const {
  register,
  login,
  getUsers,
  deleteUser,
  getUserById,
  patchUser
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.patch("/deleteUser/:id", deleteUser);
router.patch("/patchUser/:id", patchUser);

module.exports = router;
