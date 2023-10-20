const projectModel = require('../models/project.model');

// Add a new Project
const addProject = async (req, res) => {
    try {
        let existingProjectName = await projectModel.findOne({ projectName: req.body.projectName });
        if (existingProjectName) {
            return res.status(200).json({ status: '400', message: 'Project Name Already exist' });
        }

        const objData = {
            projectName: req.body.projectName,
            clientName: req.body.clientName,
            technology: req.body.technology,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            projectDesc: req.body.projectDesc,
            project_type: req.body.project_type
        }
        let result = await projectModel.create(objData)
        if (result) {
            return res.status(200).json({ status: '200', message: 'project created successfully!', response: result });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message })
    }
}

// Get all Projects WRT status
const getProjects = async (req, res) => {
    try {
        const pageSize = 10;
        const totalCount = await projectModel.countDocuments({ activeStatus: req.query.activeStatus });
        const projects = await projectModel.find({ activeStatus: req.query.activeStatus }).populate('technology', 'techName')
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip((parseInt(req.query.skip) - 1) * pageSize);
        const totalPages = Math.ceil(totalCount / pageSize);

        return res.status(200).json({ status: '200', message: 'Projects fetched successfully', response: projects, totalCount, totalPages })
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message });
    }
}

// Get A Project By id
const getProjectById = async (req, res) => {
    try {
        const project = await projectModel.findById({ _id: req.query.projectId }).populate('technology', 'techName');
        return res.status(200).json({ status: '200', message: 'Projects fetched successfully', response: project })
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message });
    }
}

// Update a project
const updateProject = async (req, res) => {
    try {
        await projectModel.findByIdAndUpdate({ _id: req.body.projectId }, req.body, { new: true });
        return res.status(200).json({ status: "200", message: "Project updated successfully" })
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message })
    }
}

// update project status
const updateStatus = async (req, res) => {
    try {
        await projectModel.findByIdAndUpdate({ _id: req.body.projectId }, { activeStatus: req.body.activeStatus });
        return res.status(200).json({ status: '200', message: 'Project Active InActive status updated Successfully' });
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message })
    }
}



module.exports = { addProject, getProjects, updateProject, updateStatus, getProjectById, };
