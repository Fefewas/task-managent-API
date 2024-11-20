const { ObjectId } = require("mongodb");
const getColl = require("../middlewares/dbComunication");
const handleError = require("../middlewares/handleError");
const validateUser = require("../validators/user.validators");
const jwt = require("jsonwebtoken");
const {
  generatePassword,
  passwordKey,
  validatePassword,
} = require("../middlewares/password.encrypt");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2h" });
};

const register = async (req, res) => {
  try {
    const user = validateUser(req);
    if (!user.position) {
      user.position = "employee";
    }
    const passwordHash = generatePassword(user.password);
    user.passwordKey = passwordKey;
    user.passwordHash = passwordHash;
    delete user.password;
    const result = await getColl("users").insertOne(user);
    res.status(201).json({
      id: result.insertedId,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err) {
    console.error("Error en el registro:", err);
    if (err.code === 11000) {
      res
        .status(400)
        .send({ message: "El email ya está registrado: " + err.message });
    } else {
      res
        .status(400)
        .send({ message: "Error en el registro", details: err.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getColl("users").findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Usuario no encontrado" });
    }

    const isValid = validatePassword(
      password,
      user.passwordKey,
      user.passwordHash
    );

    if (!isValid) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }
    const accessToken = generateAccessToken(user);
    res.status(200).header("authorization", accessToken).json({
      message: "Inicio de sesión exitoso",
      userID: user._id,
      token: accessToken,
    });
  } catch (err) {
    handleError(err, res);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getColl("users").find().toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    handleError(err, res);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const task = await getColl("users").findOne({ _id: new ObjectId(id) });
    if (!task) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(task);
  } catch (err) {
    console.log(err);
  }
};

const patchUser = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const update = req.body;
  update.updatedAt = new Date()
  const result = await getColl("users").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  if (result) {
    res.status(201).json(result);
  } else {
    console.error(err);
    handleError(err, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const result = await getColl("users").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { deleted: true } }
    );
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "User not found or already deleted" });
    }
    res.status(202).send("Succesfully removed");
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  getUserById,
  patchUser
};
