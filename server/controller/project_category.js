const projectCategorySchema = require('../models/project_category');
const category = async (req, res) => {
    try {
        const result = await projectCategorySchema.find({ deleteStatus: true });
        if (result) {
            return res.status(200).json({ status: '200', data: result, message: ' Project Category' })
        } else {
            return res.status(200).json({ status: '400', message: 'Data not found' })
        }
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}
const addCategory = async (req, res) => {
    try {
        const catData = {
            name: req.body.name,
            description: req.body.description,
            project: req.body.project,
            deleteStatus: true
        }
        const existingname = await projectCategorySchema.findOne({ name: catData.name });
        if (!existingname) {
            const result = await projectCategorySchema.create(catData);
            return res.status(200).json({ status: '200', data: result, message: 'Project category Added Successfully' })
        } else {
            return res.status(200).json({ status: '400', message: 'Category name already exist' })
        }
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}
const UpdateCategory = async (req, res) => {
    try {
        const existingname = await projectCategorySchema.findOne({ name: req.body.name });
        if (!existingname) {
            const result = await projectCategorySchema.findByIdAndUpdate({ _id:  req.body._id }, req.body);
            return res.status(200).json({ status: '200', data: result, message: 'Project category updated Successfully' })
        } else {
            return res.status(200).json({ status: '400', message: 'Category name already exist' })
        }
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}
const deleteCategory = async (req, res) => {
    try {
        const result = await projectCategorySchema.findByIdAndUpdate({ _id: req.body.id }, { deleteStatus: false });
        if(result){
        return res.status(200).json({ status: '200', message: 'Deleted success' })
        }
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

module.exports = { category, addCategory, UpdateCategory, deleteCategory }