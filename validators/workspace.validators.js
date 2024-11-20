const validateWorkspace = (req) => {
  const { name, desc, createdBy } = req.body;

  try {
    if (typeof name !== "string" || name.trim() === "") {
      throw { status: 400, error: "El campo 'name' es inválido." };
    }
    if (typeof desc !== "string" || desc.trim() === "") {
      throw { status: 400, error: "El campo 'description' es inválido." };
    }

    return {
      name,
      desc,
      createdBy,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  } catch (err) {
    console.error("Validation Error: ", err);
    throw err;
  }
};

module.exports = validateWorkspace;
