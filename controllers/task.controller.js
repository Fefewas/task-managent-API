const { ObjectId } = require("mongodb");
const handleError = require("../middlewares/handleError");
const getColl = require("../middlewares/dbComunication");
const validateTask = require("../validators/task.validators");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await getColl("tasks").find().toArray();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    handleError(err, res);
  }
};

const getTasksByWorkspace = async (req, res) => {
  try {
    const { id: workspaceId } = req.params;
    const tasks = await getColl("tasks").find({ workspaceId }).toArray();
    res.status(200).json(tasks);
  } catch (err) {
    handleError(err);
  }
};

const getTrash = async (req, res) => {
  try {
    const { id: workspaceId } = req.params;

    const tasks = await getColl("tasks").find({
      workspaceId,
      deleted: true
    }).toArray();

    res.status(200).json(tasks);
  } catch (err) {
    handleError(err, res);
  }
};


const getTasksById = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const task = await getColl("tasks").findOne({ _id: new ObjectId(id) });
    if (!task) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(task);
  } catch (err) {
    console.log(err);
  }
};

const searchByTitle = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    const result = await getColl("tasks")
      .find({
        $text: {
          $search: searchQuery,
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      })
      .project({ score: { $meta: "textScore" }, _id: 0 })
      .sort({ score: { $meta: "textScore" } })
      .limit(10);

    const array = await result.toArray();
    return res.status(200).json(array);
  } catch (err) {
    console.error(err);
    handleError(err, res);
  }
};

const createTask = async (req, res) => {
  try {
    const task = validateTask(req);
    if (!task.status) {
      task.status = "Pending";
    }
    if (!task.highlighted) {
      task.highlighted = false;
    }
    const result = await getColl("tasks").insertOne(task);
    res.status(201).json({
      id: result.insertedId,
      ...task,
    });
  } catch (err) {
    console.error("Error al crear tarea:", err);
    handleError(err, res);
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const update = req.body;
  update.updatedAt = new Date()
  const result = await getColl("tasks").findOneAndUpdate(
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

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const result = await getColl("tasks").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { deleted: true } }
    );
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Task not found or already deleted" });
    }
    res.status(202).send("Succesfully removed");
  } catch (err) {
    handleError(err, res);
  }
};
const recoverTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const result = await getColl("tasks").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { deleted: false } }
    );
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Task not found" });
    }
    res.status(202).send("Succesfully recovered");
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getAllTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  searchByTitle,
  getTasksByWorkspace,
  getTrash,
  recoverTask
};
