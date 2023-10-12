const express = require('express');
const { addtaskType, taskType } = require('../controller/tasktype')

const tastTypeRoute = express.Router();
tastTypeRoute.get('/', taskType)
tastTypeRoute.post('/addtasktype', addtaskType)

module.exports = tastTypeRoute;