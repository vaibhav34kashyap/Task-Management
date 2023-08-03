const projectModel = require('../models/projects');
const teamModel = require('../models/team');
const milestoneModel = require('../models/milestone');
const getProject = async (req, res) => {

    try {
        let data = await projectModel.find({ deleteStatus: true });

        if (data) {
            return res.status(200).json({ status: '200', project: data })
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '400', message: 'Something went wrong' })
    }

}

const getProjectById = async (req, res) => {

    try {
        const _id = req.body._id
        let data = await projectModel.findById({ _id: _id });

        if (data) {
            return res.status(200).json({ status: '200', project: data, message: 'Success' })
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }

}

const getProjectMilestone = async (req, res) => {

    try {
        const project_id = req.body.project_id
        let data = await milestoneModel.find({ project_id: project_id });
        if (data) {
            return res.status(200).json({ status: '200', project: data, message: 'Success' })
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }

}

const addProject = async (req, res) => {
    try {
        const objData = {
            projectName: req.body.projectName,
            projectSlug: req.body.projectSlug,
            projectLead: req.body.projectLead,
            projectIcon: req.body.projectIcon,
            projectAccess: req.body.projectAccess,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
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
        console.log(err);
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
        console.log(err);
        return res.status(200).json({ status: '404', message: 'Something went wrong' })
    }
}

const updateProjectStatus = async (req, res) => {
    try {
        let _id = req.body._id;
        const value = req.body.statusvalue;
        let result = await projectModel.findByIdAndUpdate(_id, { projectStatus: value });

        if (result) {
            return res.status(200).json({ status: '200', project: result, message: 'Project status updated Successfully' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '404', message: 'Something went wrong' })
    }
}

const deleteProject = async (req, res) => {
    try {
        const _id = req.body._id
        let result = await projectModel.findByIdAndUpdate({ _id: _id }, { deleteStatus: false });
        if (result) {
            return res.status(200).json({ status: '200', message: 'Project Deleted Successfully' });
        } else {
            return res.status(200).json({ status: '400', message: 'Not Found' });
        }
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
        console.log(err);
        res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

module.exports = { getProject, addProject, updateProject, getProjectMilestone, deleteProject, getProjectById, projectAssigned, updateProjectStatus };