const mongoose = require('mongoose');
const taskModel = require('../models/task.model');
const assignUserModel = require('../models/assignUser.model');

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

// Get All tasks And Sprint id,s all tasks
const getTasks = async (req, res) => {
    try {
        var totalPages = 0
        const query = {};
        var totalCount = 0;
        if (parseInt(req.query.skip) === 0) {
            if (req.query.sprintId) {
                totalCount = await taskModel.countDocuments(query);
                query.sprintId = new mongoose.Types.ObjectId(req.query.sprintId);
                query.activeStatus = JSON.parse(req.query.activeStatus);
                totalCount = await taskModel.countDocuments(query);
                var pageSize = totalCount === 0 ? 1 : totalCount;
                var skip = 1
            }
            else {
                query.activeStatus = JSON.parse(req.query.activeStatus);
                totalCount = await taskModel.countDocuments(query);
                var pageSize = totalCount === 0 ? 1 : totalCount;
                var skip = 1
            }
        }
        else {
            query.activeStatus = JSON.parse(req.query.activeStatus);
            if (req.query.sprintId) {
                query.sprintId = new mongoose.Types.ObjectId(req.query.sprintId);
            }
            var pageSize = 10;
            var skip = req.query.skip;
        }
        totalCount = await taskModel.countDocuments(query);
        const tasks = await taskModel.aggregate([
            {
                $match: query
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
                    status: { $first: '$status' },
                    activeStatus: { $first: '$activeStatus' },
                    projectInfo: { $first: { $arrayElemAt: ['$projects', 0] } },
                    milestoneInfo: { $first: { $arrayElemAt: ['$milestones', 0] } },
                    sprintInfo: { $first: { $arrayElemAt: ['$sprints', 0] } },
                    assignees: { $first: { $arrayElemAt: [['$assignees'], 0] } },
                }
            }
        ]).sort({ createdAt: -1 })
            .limit(pageSize)
            .skip((parseInt(skip) - 1) * pageSize);
        totalPages = Math.ceil(totalCount / pageSize);
        return res.status(200).json({ status: "200", message: "All Tasks fetched successfully", response: tasks, totalCount, totalPages });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const taskId = req.body.taskId;
        const obj = {
            summary: req.body.summary,
            description: req.body.description,
            priority: req.body.priority,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            status : req.body.status
        };
        const secObj = {
            assigneeId: req.body.assigneeId,
            reporterId: req.body.reporterId
        };

        await taskModel.findByIdAndUpdate(taskId, obj, { new: true });

        await assignUserModel.findOneAndUpdate({ taskId }, secObj, { new: true });

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

// Get tasks according to status
const getTasksAccToStatus = async (req, res) => {
    try {
        let todo = null;
        let inProgress = null;
        let hold = null;
        let done = null;
        let query = {}
        for (let i = 1; i < 5; i++) {
            if (req.query.projectId && req.query.milestoneId && req.query.sprintId) {
                query.projectId = new mongoose.Types.ObjectId(req.query.projectId);
                query.milestoneId = new mongoose.Types.ObjectId(req.query.milestoneId);
                query.sprintId = new mongoose.Types.ObjectId(req.query.sprintId);
                query.activeStatus = JSON.parse(req.query.activeStatus);
                query.status = i
            }
            else {
                query.status = i
            }
            const tasks = await taskModel.aggregate([
                {
                    $match: query
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
                        status: { $first: '$status' },
                        activeStatus: { $first: '$activeStatus' },
                        projectInfo: { $first: { $arrayElemAt: ['$projects', 0] } },
                        milestoneInfo: { $first: { $arrayElemAt: ['$milestones', 0] } },
                        sprintInfo: { $first: { $arrayElemAt: ['$sprints', 0] } },
                        assignees: { $first: { $arrayElemAt: [['$assignees'], 0] } },
                    }
                }
            ])
            let taskCount = await taskModel.countDocuments(query);

            if (i == 1) {
                todo = { tasks, taskCount };
            }
            if (i == 2) {
                inProgress = { tasks, taskCount };
            }
            if (i == 3) {
                hold = { tasks, taskCount };
            }
            if (i == 4) {
                done = { tasks, taskCount };
            }
        }

        return res.status(200).json({ status: '200', message: "fetched successfully", Response: todo, inProgress, hold, done });

    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Priority breakdown of Tasks for a User as well as For admin
const getPriorityTasks = async (req, res) => {
    try {
        const firstPriority = await taskModel.find({ priority: 1 }).sort({ createdAt: -1 });
        const secondPriority = await taskModel.find({ priority: 2 }).sort({ createdAt: -1 });
        const thirdPriority = await taskModel.find({ priority: 3 }).sort({ createdAt: -1 });
        return res.status(200).json({ status: '200', message: "Prioity wise tasks fetched successfully", response: firstPriority, secondPriority, thirdPriority });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// // Get Status overview of tasks
// const getTasksStatusOverview = async (req, res) => {
//     try {
//         const todoCount = await taskModel.countDocuments({ status: 1 });
//         const inProgressCount = await taskModel.countDocuments({ status: 2 });
//         const holdCount = await taskModel.countDocuments({ status: 3 });
//         const doneCount = await taskModel.countDocuments({ status: 4 });

//         return res.status(200).json({ status: '200', message: "Tasks count fetched successfully", response: todoCount, inProgressCount, holdCount, doneCount });
//     } catch (error) {
//         return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
//     }
// }

const getTasksStatusOverview = async (req, res) => {
    try {
        let query = {}; // Initialize an empty query object

        if (req.query.projectId) {
            query.projectId = req.query.projectId;
        }

        if (req.query.milestoneId) {
            query.milestoneId = req.query.milestoneId;
        }

        if (req.query.sprintId) {
            query.sprintId = req.query.sprintId;
        }

        const result = await taskModel.find(query);

        return res.status(200).json({ status: '200', message: "Tasks count fetched successfully", response: result });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}



module.exports = {
    createtask, getTasks, updateTask, deleteTask, updateTaskStatus, updateTaskActiveStatus, getTasksAccToStatus, getPriorityTasks, getTasksStatusOverview
};
