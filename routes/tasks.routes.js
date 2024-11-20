const Router = require("express");
const router = Router();
const {
  getAllTasks,
  getTasksById,
  createTask,
  deleteTask,
  updateTask,
  searchByTitle,
  getTasksByWorkspace,
  recoverTask
} = require("../controllers/task.controller");

router.get("/tasks/", getAllTasks);
router.get("/tasks/:id", getTasksById);
router.get("/tasks/search/title", searchByTitle);
router.get("/workspace/:id/tasks", getTasksByWorkspace);
router.post("/tasks", createTask);
router.patch("/tasks/:id", updateTask);
router.patch("/deleteTasks/:id", deleteTask);
router.patch("/recoverTask/:id", recoverTask)

module.exports = router;
