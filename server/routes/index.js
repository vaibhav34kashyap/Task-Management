const express = require('express');
const router = express.Router();

const userRoutes = require("./authenitcation");
const profileRoutes = require("./profile");
const taskRoutes = require("./task");
const projectRoute = require("./projectRoute");
const sprintRoute = require("./sprint");
const subtaskRoute = require("./subtask");
const labelRoute = require("./label");
const taskTypeRoute = require("./tasktype");
const activityRoute = require("./taskActivity");
const searchroute = require("./searchroute");
const catRouter = require("./project_category");
const recentTaskRoute = require("./recenttask");
const searchUserRoute = require("./search_user");
const milestoneRoute = require("./milestone");
const rolesRoute = require("./roles");


router.use("/users", userRoutes);
router.use("/profile", profileRoutes);
router.use("/task", taskRoutes);
router.use("/task/subtask", subtaskRoute);
router.use("/project", projectRoute);
router.use("/sprint", sprintRoute);
router.use("/label", labelRoute);
router.use("/tasktype", taskTypeRoute);
router.use("/taskactivity", activityRoute);
router.use("/projectcategory", catRouter);
router.use("/search", searchroute);
router.use("/recenttask", recentTaskRoute);
router.use("/searchuser", searchUserRoute);
router.use("/milestone", milestoneRoute);
router.use("/roles", rolesRoute);

module.exports = router;