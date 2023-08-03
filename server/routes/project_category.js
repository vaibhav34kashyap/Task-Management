const express = require('express');
const catRouter = express.Router();
const category = require('../controller/project_category')

catRouter.get('/',  category.category )
catRouter.post('/addcatory', category.addCategory )
catRouter.put('/updatecatory', category.UpdateCategory )
catRouter.delete('/deletecategory', category.deleteCategory )

module.exports = catRouter;