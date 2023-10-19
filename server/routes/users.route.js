const express = require("express");
const users = require("../controller/users.controller");
const userRoute = express.Router();


userRoute.post("/register", users.registerUser);
userRoute.post("/login", users.logInUser);
userRoute.get("", users.getUsers);
// userRoute.post("/forgotpasswordlink", users.forgotPassword);
// userRoute.post("/forgotpasswordupdate", users.forgotPasswordupdate);
// userRoute.post("/changepassword", users.changePassword);
// // invite team members
// userRoute.post("/inviteMember", users.inviteTeamMember);
// userRoute.post("/getuseronproject", users.getUsersOnProject);
userRoute.delete("/deleteUser", users.deleteUser);

module.exports = userRoute;