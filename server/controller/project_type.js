const projectTypeModel = require('../models/project_type');

// Get types of Project
const GetProjectTypes = async (req, res) => {
    try {
        const result = await projectTypeModel.find({ status: true });
        return res.status(200).json({ status: '200', message: 'Project type data feteched Successfully', response: result })
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

// Add  a project type
const addProjectType = async (req, res) => {
    try {
        const result = await projectTypeModel.create({
            name: req.body.name
        });
        return res.status(200).json({ status: '200', message: 'Project type Added Successfully', response: result })
    }
    catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

// Update a project type
const UpdateProjectType = async (req, res) => {
    try {
        await projectTypeModel.findByIdAndUpdate({ _id: req.body._id }, req.body);
        return res.status(200).json({ status: '200', message: 'Project type updated Successfully' })
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

// Deactivate a project type
const deactivateProjectType = async (req, res) => {
    try {
        await projectTypeModel.findByIdAndUpdate({ _id: req.body.id }, { status: false });
        return res.status(200).json({ status: '200', message: 'Project type deactivated Successfully' });
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

module.exports = { GetProjectTypes, addProjectType, UpdateProjectType, deactivateProjectType }