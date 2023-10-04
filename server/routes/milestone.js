// const express = require('express');
// const milestoneRoute = express.Router();
// const milestone = require('../controller/milestone');
// milestoneRoute.get('/', milestone.showAllMilestone);
// milestoneRoute.get('/inprogress', milestone.InprogressMilestone);
// milestoneRoute.get('/getmilestonebyid/:id', milestone.getSingleMileston);
// // milestoneRoute.post('/getallmilestonetask', milestone.getAllMilestoneTask);
// milestoneRoute.post('/add', milestone.addMilestone);
// milestoneRoute.put('/update', milestone.updateMilestone);
// milestoneRoute.delete('/delete/:id', milestone.deleteMilestone);

// module.exports = milestoneRoute


const express = require('express');
const milestoneRoute = express.Router();
const milestone = require('../controller/milestone');
milestoneRoute.get('/', milestone.getMilestones);
milestoneRoute.get('/inprogress', milestone.InprogressMilestone);
milestoneRoute.get('/getmilestonebyid/:id', milestone.getSingleMileston);
// milestoneRoute.post('/getallmilestonetask', milestone.getAllMilestoneTask);
milestoneRoute.post('/add', milestone.addMilestone);
milestoneRoute.put('/update', milestone.updateMilestone);
milestoneRoute.put('/deactivateMilestone/:id', milestone.deactivateMilestone);
milestoneRoute.get('/getAProjectMilestones', milestone.getAProjectMilestones);

module.exports = milestoneRoute
