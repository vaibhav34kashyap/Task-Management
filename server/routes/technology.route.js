const express = require("express");
const technology = require("../controller/technology.controller");
const technologyRoute = express.Router();

// Crud of techCategory
technologyRoute.post('/addTechCategory', technology.addTechCategory);
technologyRoute.get('/getTechCategory', technology.getTechCategory);
technologyRoute.put('/updateTechCategory', technology.updateTechCategory);
technologyRoute.put('/updateTechCategoryStatus', technology.updateTechCategoryStatus);
// Crud of Technology
technologyRoute.post('/addTechnology', technology.addTechnology);
technologyRoute.get('/getTechnology', technology.getTechnology);
technologyRoute.put('/updateTechnology', technology.updateTechnology);
technologyRoute.put('/updateTechnologyStatus', technology.updateTechnologyStatus);

technologyRoute.get('/getTechCategoryTechnologies', technology.getTechCategoryTechnologies);

module.exports= technologyRoute;