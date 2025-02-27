const express = require('express');
const projectRoute = express.Router();
const projectPath = require('../controller/project.controller');
const { verifyAdmin } = require('../middleware/jwt.auth');

projectRoute.get('/getProjects', projectPath.getProjects);
projectRoute.post('/addProject', verifyAdmin, projectPath.addProject);
projectRoute.put('/update', verifyAdmin, projectPath.updateProject);
projectRoute.put('/updateStatus', verifyAdmin, projectPath.updateStatus);

module.exports = projectRoute;