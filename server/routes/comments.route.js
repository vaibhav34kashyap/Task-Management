const express = require("express");
const comments = require('../controller/comments.controller');
const commentsRoute = express.Router();

commentsRoute.post('/addComment', comments.addComment);
commentsRoute.get('/getTaskComment', comments.getTaskComment);

module.exports= commentsRoute;