const express = require("express");
const profileRoute = express.Router();

const profiledetails  = require("../controller/profile");

profileRoute.get("/profiledetails",profiledetails.profiledetails);
profileRoute.put("/updatepassword",profiledetails.updatePassword);

module.exports = profileRoute;