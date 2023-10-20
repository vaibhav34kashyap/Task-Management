const express = require('express');
const router = express.Router();

const userRoutes = require("./users.route");
const taskRoutes = require("./task.route");
const projectRoute = require("./project.route");
const sprintRoute = require("./sprint");
const activityRoute = require("./taskActivity");
const milestoneRoute = require("./milestone");
const rolesRoute = require("./roles.route");
const technologyRoute = require("./technology.route");
const assignUserRoute = require("./assignUser.route");
const commentsRoute = require("./comments.route");


router.use("/users", userRoutes);
router.use("/task", taskRoutes);
router.use("/project", projectRoute);
router.use("/sprint", sprintRoute);
router.use("/taskactivity", activityRoute);
router.use("/milestone", milestoneRoute);
router.use("/roles", rolesRoute);
router.use("/technology", technologyRoute);
router.use("/assignUser", assignUserRoute);
router.use("/comments", commentsRoute);

module.exports = router;