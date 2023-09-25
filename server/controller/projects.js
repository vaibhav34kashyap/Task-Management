const projectModel = require('../models/projects');
const teamModel = require('../models/team');
const milestoneModel = require('../models/milestone');
const getProject = async (req, res) => {
    try {
        let project = await projectModel.find({ deleteStatus: true });
        if (project) {
            return res.status(200).json({ status: '200', project: project })
        }
    } catch (err) {
        return res.status(200).json({ status: '400', message: 'Something went wrong' })
    }

}

const getProjectById = async (req, res) => {

    try {
        const _id = req.body._id
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

// const addProject = async (req, res) => {
//     try {
//         const objData = {
//             projectName: req.body.projectName,
//             projectSlug: req.body.projectSlug,
//             projectLead: req.body.projectLead,
//             projectIcon: req.body.projectIcon,
//             projectAccess: req.body.projectAccess,
//             startDate: req.body.startDate,
//             endDate: req.body.endDate,
//             CompilationDate: req.body.CompilationDate,
//             clientName: req.body.clientName,
//             technology: req.body.technology,
//             key: req.body.key,
//             projectCategory: req.body.projectCategory,
//             projectType: req.body.projectType,
//             projectDesc: req.body.projectDesc,
//             deleteStatus: true
//         }
//         let existingProjectName = await projectModel.findOne({ projectName: objData.projectName });
//         const str = objData.projectType.split(",")
//         objData.projectType = str
//         if (existingProjectName) {
//             return res.status(200).json({ status: '400', message: 'Project Name Already exist' });
//         }
//         let result = await projectModel.create(objData)
//         if (result) {
//             return res.status(200).json({ status: '200', project: result, message: 'project created successfully!' });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(200).json({ status: '500', message: 'Something went wrong' })
//     }
// }

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
        let result = await projectModel.findByIdAndUpdate({_id:req.body._id}, { projectStatus: req.body.statusvalue });
        if (result) {
            return res.status(200).json({ status: '200', project: result, message: 'Project status updated Successfully' });
        }
    } catch (err) {
        return res.status(200).json({ status: '404', message: 'Something went wrong' })
    }
}

const deleteProject = async (req, res) => {
    try {
        let result = await projectModel.findByIdAndUpdate({ _id: req.params.id }, { deleteStatus: false });
        if (result) {
            return res.status(200).json({ status: '200', message: 'Project Deleted Successfully' });
        } else {
            return res.status(200).json({ status: '400', message: 'Not Found' });
        }
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

module.exports = { getProject, addProject, updateProject, getProjectMilestone, deleteProject, getProjectById, projectAssigned, updateProjectStatus };