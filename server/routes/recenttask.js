const express = require('express');

const recentTaskRoute = express.Router();
const recentTasks = require('../controller/recenttask')

recentTaskRoute.post('/', recentTasks.recentTasks)

module.exports = recentTaskRoute;