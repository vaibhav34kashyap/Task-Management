const express = require('express');
const sprintRoute = express.Router();
const path = require('../controller/sprint.controller');

sprintRoute.post('/add', path.addSprint);
sprintRoute.get('/getsprintbyid', path.getSprintById);
sprintRoute.put('/update', path.updateSprint);
sprintRoute.put('/updateStatus', path.updateStatus);
sprintRoute.get('/getAMilestoneAllSprints', path.getAMilestoneAllSprints);


module.exports = sprintRoute;