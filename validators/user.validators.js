const validateUser = (req) => {
  const { email, password, fullName, position } = req.body;

  try {
    if (typeof email !== "string" || email.trim() === "") {
      throw { status: 400, error: "El campo 'email' es inválido." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw {
        status: 400,
        error: "El formato del correo electrónico es inválido.",
      };
    }
    if (typeof password !== "string" || password.trim() === "") {
      throw { status: 400, error: "El campo 'password' es inválido." };
    }
    if (typeof fullName !== "string" || fullName.trim() === "") {
      throw { status: 400, error: "El campo 'fullName' es inválido." };
    }
    if (position && typeof position !== "string") {
      throw {
        status: 400,
        error: "El campo 'position' debe ser una cadena de texto.",
      };
    }

    return {
      email,
      password,
      fullName,
      position,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  } catch (err) {
    console.error("Validation Error:", err);
    throw err;
  }
};

module.exports = validateUser;
