const express = require('express');
const milestoneRoute = express.Router();
const milestone = require('../controller/milestone');

milestoneRoute.get('/', milestone.getMilestones);
milestoneRoute.get('/getmilestonebyid/:id', milestone.getSingleMileston);
milestoneRoute.post('/add', milestone.addMilestone);
milestoneRoute.put('/update', milestone.updateMilestone);
milestoneRoute.put('/updateStatus', milestone.updateStatus);
milestoneRoute.get('/getAProjectMilestones', milestone.getAProjectMilestones);

module.exports = milestoneRoute
