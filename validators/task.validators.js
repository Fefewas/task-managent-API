const validateTask = (req) => {
  const { title, desc, status, highlighted, userID, workspaceId, createdBy } =
    req.body;

  try {
    if (typeof title !== "string" || title.trim() === "") {
      throw { status: 400, error: "The 'title' field is invalid." };
    }
    if (typeof desc !== "string" || desc.trim() === "") {
      throw { status: 400, error: "The 'desc' field is invalid." };
    }
    if (status && typeof status !== "string") {
      throw { status: 400, error: "The 'status' field must be a text string." };
    }
    if (highlighted !== undefined && typeof highlighted !== "boolean") {
      throw {
        status: 400,
        error: "El campo 'highlighted' debe ser un booleano.",
      };
    }

    return {
      title,
      desc,
      status,
      highlighted,
      userID,
      workspaceId,
      createdBy,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  } catch (err) {
    console.error("Validation Error:", err);
    throw err;
  }
};

module.exports = validateTask;
