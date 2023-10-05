const express = require('express');

const searchroute = express.Router();
const searchData = require('../controller/search')

searchroute.post('/', searchData.getSearchData)

module.exports = searchroute;