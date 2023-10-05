const express = require('express');

const searchUserRoute = express.Router();
const searchData = require('../controller/search_user');

searchUserRoute.post('/', searchData.searchUser);

module.exports = searchUserRoute;