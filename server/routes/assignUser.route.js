const express = require("express");
const assignUser = require('../controller/assignUser.controller');
const { verifyEmployee } = require("../middleware/jwt.auth");
const assignUserRoute = express.Router();

assignUserRoute.post('/addUserAssignments', assignUser.addUserAssignments);
assignUserRoute.get('/getUserTasks', verifyEmployee, assignUser.getUserTasks);
// assignUserRoute.get('/getUserAssignment', assignUser.getUserAssignment);
assignUserRoute.get('/getUserAssignments', assignUser.getUserAssignments);

module.exports = assignUserRoute;