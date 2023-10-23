const taskModel = require('../models/task.model');
const assignUserModel = require('../models/assignUser.model');
const mongoose = require('mongoose')

// Create or add tasks
const createtask = async (req, res) => {
    try {
        const { projectId, milestoneId, sprintId, summary, description, assigneeId, reporterId, startDate, dueDate } = req.body;

        const existingtask = await taskModel.findOne({ summary: summary });
        if (existingtask) {
            return res.status(200).json({ status: "400", message: "Task already exists" });
        } else {
            const task = await taskModel.create({
                projectId,
                milestoneId,
                sprintId,
                summary,
                description,
                startDate,
                dueDate,
            });
            const assignedUser = await assignUserModel.create({
                assigneeId: assigneeId, // One who is doing work
                reporterId: reporterId, // one who will assignee report after work done
                taskId: task._id
            })
            return res.status(200).json({ status: "200", message: "Task created successfully", response: task, assignedUser });
        }
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// // Get List of all Tasks
// const getTasks = async (req, res) => {
//     try {
//         const pageSize = 5;
//         const totalCount = await taskModel.countDocuments({ activeStatus: req.query.activeStatus });
//         const tasks = await taskModel.find({ activeStatus: req.query.activeStatus }).populate([
//             { path: 'projectId', select: 'projectName' },
//             { path: 'milestoneId', select: 'title' },
//             { path: 'sprintId', select: 'sprintName' },
//         ])
//             .sort({ createdAt: -1 })
//             .limit(pageSize)
//             .skip((parseInt(req.query.skip) - 1) * pageSize);
//         const totalPages = Math.ceil(totalCount / pageSize);

//         return res.status(200).json({ status: "200", message: "All Tasks fetched successfully", response: tasks, totalCount, totalPages });
//     } catch (error) {
//         return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
//     }
// }


const getTasks = async (req, res) => {
    try {
        const pageSize = 10;
        if (req.query.skip===0) {
            const totalCount = await taskModel.countDocuments({ sprintId: req.query.sprintId, activeStatus: req.query.activeStatus });
            const tasks = await taskModel.aggregate([
                {
                    $match: { sprintId: new mongoose.Types.ObjectId(req.query.sprintId), activeStatus: req.query.activeStatus }
                },
                {
                    $lookup: {
                        from: 'projects',
                        localField: 'projectId',
                        foreignField: '_id',
                        as: 'projects',
                    },
                },
                {
                    $lookup: {
                        from: 'milestones',
                        localField: 'milestoneId',
                        foreignField: '_id',
                        as: 'milestones',
                    },
                },
                {
                    $lookup: {
                        from: 'sprints',
                        localField: 'sprintId',
                        foreignField: '_id',
                        as: 'sprints',
                    },
                },
                {
                    $lookup: {
                        from: 'assignusers',
                        localField: '_id',
                        foreignField: 'taskId',
                        as: 'assignees',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'assignees.assigneeId',
                        foreignField: '_id',
                        as: 'assigneeInfo',
                    },
                },
                {
                    $lookup: {
                        from: 'roles',
                        localField: 'assignees.reporterId',
                        foreignField: '_id',
                        as: 'reporterInfo',
                    },
                },
                {
                    $unwind: '$assignees' // Unwind the assignees array
                },
                {
                    $addFields: {
                        'assignees.assigneeInfo': {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: '$assigneeInfo',
                                        as: 'info',
                                        cond: { $eq: ['$$info._id', '$assignees.assigneeId'] },
                                    },
                                },
                                0,
                            ],
                        },
                        'assignees.reporterId': '$assignees.reporterId',
                        'assignees.reporterInfo': {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: '$reporterInfo',
                                        as: 'reporter',
                                        cond: { $eq: ['$$reporter._id', '$assignees.reporterId'] },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $group: {
                        _id: '$_id',
                        summary: { $first: '$summary' },
                        description: { $first: '$description' },
                        priority: { $first: '$priority' },
                        startDate: { $first: '$startDate' },
                        dueDate: { $first: '$dueDate' },
                        dueDate: { $first: '$dueDate' },
                        status: { $first: '$status' },
                        activeStatus: { $first: '$activeStatus' },
                        projectInfo: { $first: '$projects' },
                        milestoneInfo: { $first: '$milestones' },
                        sprintInfo: { $first: '$sprints' },
                        assignees: { $push: '$assignees' }
                    },
                },
            ])
                .sort({ createdAt: -1 })
                .limit(pageSize)
                .skip((parseInt(req.query.skip) - 1) * pageSize);
            const totalPages = Math.ceil(totalCount / pageSize);

            return res.status(200).json({ status: "200", message: "All Tasks fetched successfully", response: tasks, totalCount, totalPages });
        }
        else {
            const totalCount = await taskModel.countDocuments({ activeStatus: req.query.activeStatus });
            const tasks = await taskModel.aggregate([
                {
                    $match: { activeStatus: req.query.activeStatus }
                },
                {
                    $lookup: {
                        from: 'projects',
                        localField: 'projectId',
                        foreignField: '_id',
                        as: 'projects',
                    },
                },
                {
                    $lookup: {
                        from: 'milestones',
                        localField: 'milestoneId',
                        foreignField: '_id',
                        as: 'milestones',
                    },
                },
                {
                    $lookup: {
                        from: 'sprints',
                        localField: 'sprintId',
                        foreignField: '_id',
                        as: 'sprints',
                    },
                },
                {
                    $lookup: {
                        from: 'assignusers',
                        localField: '_id',
                        foreignField: 'taskId',
                        as: 'assignees',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'assignees.assigneeId',
                        foreignField: '_id',
                        as: 'assigneeInfo',
                    },
                },
                {
                    $lookup: {
                        from: 'roles',
                        localField: 'assignees.reporterId',
                        foreignField: '_id',
                        as: 'reporterInfo',
                    },
                },
                {
                    $unwind: '$assignees' // Unwind the assignees array
                },
                {
                    $addFields: {
                        'assignees.assigneeInfo': {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: '$assigneeInfo',
                                        as: 'info',
                                        cond: { $eq: ['$$info._id', '$assignees.assigneeId'] },
                                    },
                                },
                                0,
                            ],
                        },
                        'assignees.reporterId': '$assignees.reporterId',
                        'assignees.reporterInfo': {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: '$reporterInfo',
                                        as: 'reporter',
                                        cond: { $eq: ['$$reporter._id', '$assignees.reporterId'] },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $group: {
                        _id: '$_id',
                        summary: { $first: '$summary' },
                        description: { $first: '$description' },
                        priority: { $first: '$priority' },
                        startDate: { $first: '$startDate' },
                        dueDate: { $first: '$dueDate' },
                        dueDate: { $first: '$dueDate' },
                        status: { $first: '$status' },
                        activeStatus: { $first: '$activeStatus' },
                        projectInfo: { $first: '$projects' },
                        milestoneInfo: { $first: '$milestones' },
                        sprintInfo: { $first: '$sprints' },
                        assignees: { $push: '$assignees' }
                    },
                },
            ])
                .sort({ createdAt: -1 })
                .limit(pageSize)
                .skip((parseInt(req.query.skip) - 1) * pageSize);
            const totalPages = Math.ceil(totalCount / pageSize);

            return res.status(200).json({ status: "200", message: "All Tasks fetched successfully", response: tasks, totalCount, totalPages });
        }
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
};


// Get a single task details by id
const getATask = async (req, res) => {
    try {
        const task = await taskModel.findById({ _id: req.query.taskId }).populate([
            { path: 'projectId', select: 'projectName' },
            { path: 'milestoneId', select: 'title' },
            { path: 'sprintId', select: 'sprintName' },
        ])
        return res.status(200).json({ status: "200", message: "Task Details fetched successfully", response: task });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Update Task
const updateTask = async (req, res,) => {
    try {
        await taskModel.findByIdAndUpdate({ _id: req.body.taskId }, req.body, { new: true });
        await assignUserModel.findByIdAndUpdate({ _id: req.body.taskId }, req.body, { new: true })
        return res.status(200).json({ status: "200", message: "Task updated successfully" });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Delete A Task
const deleteTask = async (req, res) => {
    try {
        await taskModel.findByIdAndDelete({ _id: req.query.taskId });
        await assignUserModel.deleteMany({ taskId: req.query.taskId });
        return res.status(200).json({ status: '200', message: 'Task Deleted successfully' })
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: err.message })
    }
}

// update Status of a task
const updateTaskStatus = async (req, res,) => {
    try {
        await taskModel.findByIdAndUpdate({ _id: req.body.taskId }, { status: req.body.status }, { new: true });
        return res.status(200).json({ status: "200", message: "Task Status updated successfully" });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// update Active inactive Status of a task
const updateTaskActiveStatus = async (req, res,) => {
    try {
        await taskModel.findByIdAndUpdate({ _id: req.body.taskId }, { activeStatus: req.body.activeStatus }, { new: true });
        return res.status(200).json({ status: "200", message: "Task Active Inactive Status updated successfully" });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Get all tasks of a sprint
const getSprintTasks = async (req, res) => {
    try {
        const pageSize = 10;
        const totalCount = await taskModel.countDocuments({ sprintId: req.query.sprintId, activeStatus: req.query.activeStatus });
        const result = await taskModel.find({ sprintId: req.query.sprintId, activeStatus: req.query.activeStatus }).populate([
            { path: 'projectId', select: 'projectName' },
            { path: 'milestoneId', select: 'title' },
            { path: 'sprintId', select: 'sprintName' }
        ])
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip((parseInt(req.query.skip) - 1) * pageSize);
        const totalPages = Math.ceil(totalCount / pageSize);

        return res.status(200).json({ status: "200", message: "Sprint tasks fetched successfully", response: result, totalCount, totalPages });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Get tasks according to status
const getTasksAccToStatus = async (req, res) => {
    try {
        const todoCount = await taskModel.countDocuments({ status: 1 });
        const todo = await taskModel.find({ status: 1 }).sort({ createdAt: -1 }).populate([
            { path: 'projectId', select: 'projectName' },
            { path: 'milestoneId', select: 'title' },
            { path: 'sprintId', select: 'sprintName' },
        ]);

        const inProgressCount = await taskModel.countDocuments({ status: 2 });
        const inProgress = await taskModel.find({ status: 2 }).sort({ createdAt: -1 }).populate([
            { path: 'projectId', select: 'projectName' },
            { path: 'milestoneId', select: 'title' },
            { path: 'sprintId', select: 'sprintName' },
        ]);

        const holdCount = await taskModel.countDocuments({ status: 3 })
        const hold = await taskModel.find({ status: 3 }).sort({ createdAt: -1 }).populate([
            { path: 'projectId', select: 'projectName' },
            { path: 'milestoneId', select: 'title' },
            { path: 'sprintId', select: 'sprintName' },
        ]);

        const doneCount = await taskModel.countDocuments({ status: 4 });
        const done = await taskModel.find({ status: 4 }).sort({ createdAt: -1 }).populate([
            { path: 'projectId', select: 'projectName' },
            { path: 'milestoneId', select: 'title' },
            { path: 'sprintId', select: 'sprintName' },
        ]);

        res.status(200).json({ status: '200', message: "fetched successfully", Response: todo, todoCount, inProgress, inProgressCount, hold, holdCount, done, doneCount });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

module.exports = {
    createtask, getTasks, getATask, updateTask, deleteTask, updateTaskStatus, updateTaskActiveStatus, getSprintTasks, getTasksAccToStatus
};
