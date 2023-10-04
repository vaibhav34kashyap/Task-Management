// const express = require('express');
// const sprintRoute = express.Router();
// const path = require('../controller/sprint');
// sprintRoute.get('/',path.getSprint);
// sprintRoute.post('/getalltask',path.getAllTaskBySprint);
// sprintRoute.get('/getsprintbyid/:id',path.getSprintById);
// sprintRoute.post('/singlemilestonesprints',path.sigleMilestoneSprints);
// sprintRoute.post('/add',path.addSprint);
// sprintRoute.put('/update',path.updateSprint);
// sprintRoute.delete('/delete/:id',path.deleteSprint);


// module.exports = sprintRoute;

const express = require('express');
const sprintRoute = express.Router();
const path = require('../controller/sprint');
sprintRoute.get('/',path.getSprint);
sprintRoute.post('/getalltask',path.getAllTaskBySprint);
sprintRoute.get('/getsprintbyid/:id',path.getSprintById);
sprintRoute.post('/singlemilestonesprints',path.sigleMilestoneSprints);
sprintRoute.post('/add',path.addSprint);
sprintRoute.put('/update',path.updateSprint);
sprintRoute.patch('/delete/:id',path.deleteSprint);
sprintRoute.get('/getAMilestoneAllSprints',path.getAMilestoneAllSprints);


module.exports = sprintRoute;