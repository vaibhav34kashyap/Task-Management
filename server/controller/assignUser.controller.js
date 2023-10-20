const assignUserModel = require('../models/assignUser.model');

// Assign the user
const addUserAssignments = async (req, res) => {
    try {
        const { projectId, milestoneId, sprintId, taskId, assigneeId, reporterId } = req.body;
        const query = {
            assigneeId: assigneeId // Always include assigneeId
        };
        // Add other fields to the query if they are present in the request body
        if (projectId) query.projectId = projectId;
        if (milestoneId) query.milestoneId = milestoneId;
        if (sprintId) query.sprintId = sprintId;
        if (taskId) query.taskId = taskId;
        if (reporterId) query.reporterId = reporterId;

        const alreadyAssigned = await assignUserModel.findOne(query);
        if (alreadyAssigned) {
            return res.status(200).json({ status: "400", message: `This ${projectId || milestoneId || sprintId || taskId} is already assigned to the User ${assigneeId}` })
        } else {
            const result = await assignUserModel.create({
                projectId,
                milestoneId,
                sprintId,
                taskId,
                assigneeId,
                reporterId
            });
            return res.status(200).json({ status: "200", message: "Assigned Successfully", response: result });
        }
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Get user assigned projects
const getUserAssignment = async (req, res) => {
    try {
        const result = await assignUserModel.find({ assigneeId: req.query.assigneeId, projectId: { $exists: true } }).populate([
            { path: 'projectId', select: 'projectName' },
            { path: 'assigneeId', select: 'userName' },
            { path: 'reporterId', select: 'userName' }
        ]);
        return res.status(200).json({ status: "200", message: "Data Fetched Successfully", response: result })
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Get User assignments
const getUserAssignments = async (req, res) => {
    try {
        const query = {
            assigneeId: req.query.assigneeId
        };
        if (req.query.flag == 1) {
            query.projectId = { $exists: true };
        } else if (req.query.flag == 2) {
            query.milestoneId = { $exists: true };
        } else if (req.query.flag == 3) {
            query.sprintId = { $exists: true };
        } else if (req.query.flag == 4) {
            query.taskId = { $exists: true };
        }

        const result = await assignUserModel.find(query).populate([
            { path: 'projectId', select: 'projectName' },
            { path: 'milestoneId', select: 'title' },
            { path: 'sprintId', select: 'sprintName' },
            { path: 'taskId', select: 'summary' },
            { path: 'assigneeId', select: 'userName' },
            { path: 'reporterId', select: 'role' }
        ]);
        return res.status(200).json({ status: "200", message: "Data Fetched Successfully", response: result })
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

module.exports = { addUserAssignments, getUserAssignment, getUserAssignments }