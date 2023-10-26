const express = require("express");
const assignUser = require('../controller/assignUser.controller');
const assignUserRoute = express.Router();

assignUserRoute.post('/addUserAssignments', assignUser.addUserAssignments);
assignUserRoute.get('/getUserAssignment', assignUser.getUserAssignment);
assignUserRoute.get('/getUserAssignments', assignUser.getUserAssignments);

module.exports = assignUserRoute;