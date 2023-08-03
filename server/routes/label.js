const express = require('express');

const labelRoute = express.Router();
const { addlabels, labels, updatelabel } = require('../controller/labels');
labelRoute.get('/', labels);
labelRoute.post('/addlabel', addlabels);
labelRoute.put('/updatelabel', updatelabel);



module.exports = labelRoute;