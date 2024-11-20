const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks.routes");
const authRoutes = require("./routes/auth.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const cors = require("cors");
const PORT = process.env.PORT || 7000;
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PATCH, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(authRoutes, taskRoutes, workspaceRoutes);

app.listen(PORT, () => {
  console.log("The server is running on PORT:" + PORT);
});

module.exports = app;
