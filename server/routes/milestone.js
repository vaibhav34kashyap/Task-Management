const express = require('express');
const milestoneRoute = express.Router();
const milestone = require('../controller/milestone');
milestoneRoute.get('/', milestone.showAllMilestone);
milestoneRoute.get('/inprogress', milestone.InprogressMilestone);
milestoneRoute.post('/getmilestonebyid', milestone.getSingleMileston);
// milestoneRoute.post('/getallmilestonetask', milestone.getAllMilestoneTask);
milestoneRoute.post('/add', milestone.addMilestone);
milestoneRoute.post('/update', milestone.updateMilestone);
milestoneRoute.delete('/delete/:id', milestone.deleteMilestone);

module.exports = milestoneRoute

