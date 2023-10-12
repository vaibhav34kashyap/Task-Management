const projectModel = require('../models/projects');
const teamModel = require('../models/team');
const milestoneModel = require('../models/milestone');

// Get all Projects WRT status
const getProjects = async (req, res) => {
    try {
        const project = await projectModel.find({ status: req.query.status }).populate('technology','techName');
        return res.status(200).json({ status: '200', message: 'Projects fetched successfully', response: project })
    } catch (err) {
        return res.status(200).json({ status: '400', message: 'Something went wrong' })
    }
}

const getProjectById = async (req, res) => {

    try {
        // const _id = req.body._id
        let project = await projectModel.findById({ _id: req.params.id });

        if (project) {
            return res.status(200).json({ status: '200', project: project, message: 'Success' })
        }
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }

}

const getProjectMilestone = async (req, res) => {
    try {
        // const project_id = req.body.project_id
        let milestone = await milestoneModel.find({ project_id: req.params.id });
        if (milestone) {
            return res.status(200).json({ status: '200', project: milestone, message: 'Success' })
        }
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }

}

// Add a new Project
const addProject = async (req, res) => {
    try {
        let existingProjectName = await projectModel.findOne({ projectName: req.body.projectName });
        if (existingProjectName) {
            return res.status(200).json({ status: '400', message: 'Project Name Already exist' });
        }

        const objData = {
            projectName: req.body.projectName,
            projectLead: req.body.projectLead,
            // projectIcon: req.file.filename,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            clientName: req.body.clientName,
            technology: req.body.technology,
            projectType: req.body.projectType,
            projectDesc: req.body.projectDesc,
            project_type: req.body.project_type
        }
        let result = await projectModel.create(objData)
        if (result) {
            return res.status(200).json({ status: '200', message: 'project created successfully!', response: result });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: message.error })
    }
}

const updateProject = async (req, res) => {
    try {
        let _id = req.body._id;
        let result = await projectModel.findByIdAndUpdate(_id, req.body);
        if (result) {
            return res.status(200).json({ status: '200', project: result, message: 'Project updated Successfully' });
        }
    } catch (err) {
        return res.status(200).json({ status: '404', message: 'Something went wrong' })
    }
}

// update project status
const updateStatus = async (req, res) => {
    try {
        console.log('dfgfnhgh');
        await projectModel.findByIdAndUpdate({ _id: req.body.id }, { status: req.body.status });
        return res.status(200).json({ status: '200', message: 'Project status updated Successfully' });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

const projectAssigned = async (req, res) => {
    try {
        const objData = {
            name: req.body.name,
            userId: req.body.userId,
            projectId: req.body.projectId,
            deleteStatus: true
        }
        const existProject = await teamModel.findOne({ $and: [{ userId: req.body.userId }, { projectId: req.body.projectId }] })
        if (!existProject) {
            const result = await teamModel.create(objData);
            res.status(200).json({ status: "200", data: result, message: "Assined successfully" });

        } else {
            res.status(200).json({ status: "400", message: "Already Assigned to this user" });
        }
    } catch (err) {
        res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

module.exports = { getProjects, addProject, updateProject, getProjectMilestone, updateStatus, getProjectById, projectAssigned, };
