const express = require('express');
const projectRoute = express.Router();
const projectPath = require('../controller/project.controller');
const { verifyAdmin } = require('../middleware/jwt.auth');

projectRoute.get('/getProjects', projectPath.getProjects);
projectRoute.get('/getProjectById', projectPath.getProjectById);
projectRoute.post('/addProject', verifyAdmin, projectPath.addProject);
projectRoute.put('/update', verifyAdmin, projectPath.updateProject);
projectRoute.put('/updateStatus', verifyAdmin, projectPath.updateStatus);
projectRoute.post('/assignproject', projectPath.projectAssigned);

module.exports = projectRoute;