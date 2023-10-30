const express = require("express");
const users = require("../controller/users.controller");
const userRoute = express.Router();


userRoute.post("/register", users.registerUser);
userRoute.post("/login", users.logInUser);
userRoute.get("", users.getUsers);
userRoute.delete("/deleteUser", users.deleteUser);

module.exports = userRoute;