const express = require('express');
const milestoneRoute = express.Router();
const milestone = require('../controller/milestone.controller');

milestoneRoute.get('/getMilestoneById', milestone.getMilestoneById);
milestoneRoute.post('/add', milestone.addMilestone);
milestoneRoute.put('/update', milestone.updateMilestone);
milestoneRoute.put('/updateStatus', milestone.updateStatus);
milestoneRoute.get('/getAProjectMilestones', milestone.getAProjectMilestones);

module.exports = milestoneRoute
