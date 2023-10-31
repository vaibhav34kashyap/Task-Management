const express = require('express');
const activityRoute = express.Router();
const activity = require('../controller/task_activity')
activityRoute.post('/:taskid', activity.addtaskActivity );
activityRoute.post('/subtask/:taskid', activity.addSubTaskActivity );

module.exports = activityRoute;