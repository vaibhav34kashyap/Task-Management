const express = require('express');
const sprintRoute = express.Router();
const path = require('../controller/sprint');

sprintRoute.get('/', path.getSprints);
sprintRoute.post('/getalltask', path.getAllTaskBySprint);
sprintRoute.get('/getsprintbyid', path.getSprintById);
sprintRoute.post('/add', path.addSprint);
sprintRoute.put('/update', path.updateSprint);
sprintRoute.put('/updateStatus', path.updateStatus);
sprintRoute.get('/getAMilestoneAllSprints', path.getAMilestoneAllSprints);


module.exports = sprintRoute;