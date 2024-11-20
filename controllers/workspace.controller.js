const { ObjectId } = require("mongodb");
const getColl = require("../middlewares/dbComunication");
const handleError = require("../middlewares/handleError");
const validateUser = require("../validators/workspace.validators");
const validateWorkspace = require("../validators/workspace.validators");

const createWorkspace = async (req, res) => {
  try {
    const workspace = validateWorkspace(req);

    const result = await getColl("workspaces").insertOne(workspace);

    res.status(201).json({
      id: result.insertedId,
      name: workspace.name,
    });
  } catch (err) {
    handleError(err, res);
  }
};

const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await getColl("workspaces").find().toArray();
    res.status(200).json(workspaces);
  } catch (err) {
    handleError(err, res);
  }
};

const patchWorkspace = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const update = req.body;
    update.updatedAt = new Date();
    const result = await getColl("workspaces").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    res.status(201).json(result);
  } catch (err) {
    handleError(err, res);
  }
};

const inviteUserToYourWorkspace = async (req, res) => {
  try {
    const { id: workspaceId } = req.params;
    const { userId } = req.body;
    if (!workspaceId || !userId) {
      return res.status(400).json({ error: "Invalid workspaceId or userId" });
    }
    await getColl("workspaces").findOneAndUpdate(
      { _id: workspaceId },
      { $addToSet: { invitedUsers: userId } }
    );
  } catch (err) {
    handleError(err)
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const result = await getColl("workspaces").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { deleted: true } }
    );
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Workspace not found or already deleted" });
    }
    res.status(200).json({ message: "Workspace deleted successfully" });
  } catch (err) {
    console.error("Error deleting workspace:", err);
    handleError(err, res);
  }
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  patchWorkspace,
  deleteWorkspace,
  inviteUserToYourWorkspace
};
