const express = require('express');
const rolesRoute = express.Router();
const roles = require('../controller/roles.controller');
const { verifyUser } = require('../middleware/jwt.auth');

rolesRoute.post('/addRole', roles.addRole);
rolesRoute.get('/getRoles', verifyUser, roles.getRoles);
rolesRoute.delete('/deleteRole', roles.deleteRole);

module.exports = rolesRoute;