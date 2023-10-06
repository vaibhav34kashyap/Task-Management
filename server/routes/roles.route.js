const express = require('express');
const rolesRoute = express.Router();
const roles = require('../controller/roles.controller');

rolesRoute.post('/addRole', roles.addRole);
rolesRoute.get('/getRoles', roles.getRoles);
rolesRoute.delete('/deleteRole', roles.deleteRole);

module.exports = rolesRoute;