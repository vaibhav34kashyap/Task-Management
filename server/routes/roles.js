const express = require('express');
const rolesRoute = express.Router();
const roles = require('../controller/roles')

rolesRoute.post('/add', roles.addRoles)
rolesRoute.put('/update-user-role', roles.updateUserRole)
rolesRoute.delete('/delete-user-role', roles.deleteUserRole)

module.exports = rolesRoute;