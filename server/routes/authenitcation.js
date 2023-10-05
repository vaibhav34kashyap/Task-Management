const express = require("express");
const users = require("../controller/users");
const userRoute = express.Router();
userRoute.get("", users.getUsers);
userRoute.post("/register", users.register);
userRoute.post("/login", users.login);
userRoute.post("/forgotpasswordlink", users.forgotPassword);
userRoute.post("/forgotpasswordupdate", users.forgotPasswordupdate);
userRoute.post("/changepassword", users.changePassword);
// invite team members
userRoute.post("/inviteMember", users.inviteTeamMember);
userRoute.post("/getuseronproject", users.getUsersOnProject);
userRoute.delete("/usersDelete/:id", users.deleteUsers);

module.exports = userRoute;