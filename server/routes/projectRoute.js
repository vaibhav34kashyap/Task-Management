const express = require('express');
const projectRoute = express.Router();
const projectPath = require('../controller/projects');
projectRoute.get('/getProjects', projectPath.getProjects);
projectRoute.get('/getbyprojectid/:id', projectPath.getProjectById);
projectRoute.get('/getprojectmilestone/:id', projectPath.getProjectMilestone);
projectRoute.post('/addProject', projectPath.addProject);
projectRoute.put('/update', projectPath.updateProject);
projectRoute.put('/updateStatus', projectPath.updateStatus);
projectRoute.post('/assignproject', projectPath.projectAssigned);

module.exports = projectRoute;