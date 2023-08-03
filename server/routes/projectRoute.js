const express = require('express');
const projectRoute = express.Router();
const projectPath = require('../controller/projects');
projectRoute.get('/', projectPath.getProject);
projectRoute.post('/getbyprojectid', projectPath.getProjectById);
projectRoute.post('/getprojectmilestone', projectPath.getProjectMilestone);
projectRoute.post('/add',  projectPath.addProject);
projectRoute.put('/update',  projectPath.updateProject);
projectRoute.put('/updatestatus',  projectPath.updateProjectStatus);
projectRoute.delete('/delete',  projectPath.deleteProject);
projectRoute.post('/assignproject',  projectPath.projectAssigned);

module.exports = projectRoute;