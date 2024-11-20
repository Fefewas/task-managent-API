const Router = require("express");
const router = Router();

const {
  createWorkspace,
  getWorkspaces,
  patchWorkspace,
  deleteWorkspace,
  inviteUserToYourWorkspace
} = require("../controllers/workspace.controller");

router.post("/createWorkspace", createWorkspace);
router.get("/workspaces", getWorkspaces);
router.patch("/patchWorkspace/:id", patchWorkspace);
router.patch("/deleteWorkspace/:id", deleteWorkspace);
router.patch("/workspaces/:id/inviteUser", inviteUserToYourWorkspace)

module.exports = router;
