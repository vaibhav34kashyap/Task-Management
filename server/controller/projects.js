const projectModel = require('../models/projects');
const teamModel = require('../models/team');
const milestoneModel = require('../models/milestone');

// Get all Projects WRT status
const getProjects = async (req, res) => {
    try {
        const project = await projectModel.find({ status: req.query.status });
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
   
const addProject = async (req, res) => {
    try {
        const objData = {
            projectName: req.body.projectName,
            projectSlug: req.body.projectSlug,
            projectLead: req.body.projectLead,
            // projectIcon: req.file.filename,
            projectAccess: req.body.projectAccess,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            expectedDate: req.body.expectedDate,
            CompilationDate: req.body.CompilationDate,
            clientName: req.body.clientName,
            technology: req.body.technology,
            key: req.body.key,
            projectCategory: req.body.projectCategory,
            projectType: req.body.projectType,
            projectDesc: req.body.projectDesc,
            deleteStatus: true
        }
        let existingProjectName = await projectModel.findOne({ projectName: objData.projectName });
        const str = objData.projectType.split(",")
        objData.projectType = str
        if (existingProjectName) {
            return res.status(200).json({ status: '400', message: 'Project Name Already exist' });
        }
        let result = await projectModel.create(objData)
        if (result) {
            return res.status(200).json({ status: '200', project: result, message: 'project created successfully!' });
        }
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
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

const updateProjectStatus = async (req, res) => {
    try {
        let result = await projectModel.findByIdAndUpdate({ _id: req.body._id }, { projectStatus: req.body.statusvalue });
        if (result) {
            return res.status(200).json({ status: '200', project: result, message: 'Project status updated Successfully' });
        }
    } catch (err) {
        return res.status(200).json({ status: '404', message: 'Something went wrong' })
    }
}

// Deactivate project status
const deactivateProject = async (req, res) => {
    try {
        await projectModel.findByIdAndUpdate({ _id: req.params.id }, { status: false });
        return res.status(200).json({ status: '200', message: 'Project Deactivated Successfully' });
    } catch (err) {
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

module.exports = { getProjects, addProject, updateProject, getProjectMilestone, deactivateProject, getProjectById, projectAssigned, updateProjectStatus };