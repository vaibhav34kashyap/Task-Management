const mongoose = require('mongoose');
const taskModel = require('../models/task.model');
const assignUserModel = require('../models/assignUser.model');
const historyModel = require('../models/history.model');

// Create or add tasks
const createtask = async (req, res) => {
    try {
        const { projectId, milestoneId, sprintId, summary, description, assigneeId, reporterId, startDate, dueDate } = req.body;

        const existingTask = await taskModel.findOne({ summary: new RegExp(`^${summary}$`, 'i'), sprintId: sprintId });
        if (existingTask) {
            return res.status(400).json({ status: '400', message: 'Task already exists' });
        } else {
            const lastTask = await taskModel.countDocuments();
            const taskMannualId = lastTask + 1;
            const task = await taskModel.create({
                taskMannualId,
                projectId,
                milestoneId,
                sprintId,
                summary,
                description,
                startDate,
                dueDate,
                attachment: `http://localhost:8000/upload/${req.file.originalname}`,
            });
            if (task && req.user.role === 1) {
                const assignedUser = await assignUserModel.create({
                    assigneeId: assigneeId, // One who is doing work
                    reporterId: reporterId, // one who will assignee report after work done
                    taskId: task._id
                })
                return res.status(200).json({ status: "200", message: "Task created successfully", response: task, assignedUser });
            }
            else {
                return res.status(200).json({ status: "400", message: "Task Not created" });
            }
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
                    taskMannualId: { $first: '$taskMannualId' },
                    summary: { $first: '$summary' },
                    description: { $first: '$description' },
                    priority: { $first: '$priority' },
                    startDate: { $first: '$startDate' },
                    dueDate: { $first: '$dueDate' },
                    status: { $first: '$status' },
                    activeStatus: { $first: '$activeStatus' },
                    attachment: { $first: '$attachment' },
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
            status: req.body.status,
            attachment: `http://localhost:8000/upload/${req.file.originalname}`
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
        let existingTask = await taskModel.findById({ _id: req.body.taskId })
        await taskModel.findByIdAndUpdate({ _id: req.body.taskId }, { status: req.body.status }, { new: true });
        const HistoryTypeEnum = {
            CREATED: 'created',
            UPDATED: 'updated',
            DELETED: 'deleted',
        };
        await historyModel.create({
            type: HistoryTypeEnum.UPDATED,
            taskId: req.body.taskId,
            previousStatus: existingTask.status,
            currentStatus: req.body.status
        });
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
                // query.activeStatus = JSON.parse(req.query.activeStatus);
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
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'taskId',
                        as: 'comments',
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
                        taskMannualId: { $first: '$taskMannualId' },
                        summary: { $first: '$summary' },
                        description: { $first: '$description' },
                        priority: { $first: '$priority' },
                        startDate: { $first: '$startDate' },
                        dueDate: { $first: '$dueDate' },
                        status: { $first: '$status' },
                        activeStatus: { $first: '$activeStatus' },
                        attachment: { $first: '$attachment' },
                        projectInfo: { $first: { $arrayElemAt: ['$projects', 0] } },
                        milestoneInfo: { $first: { $arrayElemAt: ['$milestones', 0] } },
                        sprintInfo: { $first: { $arrayElemAt: ['$sprints', 0] } },
                        assignees: { $first: { $arrayElemAt: [['$assignees'], 0] } },
                        comments: { $push: '$comments' },
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
        if (req.user.role === 1) {
            const firstPriority = await taskModel.countDocuments({ priority: 1 });
            const secondPriority = await taskModel.countDocuments({ priority: 2 });
            const thirdPriority = await taskModel.countDocuments({ priority: 3 });

            const taskPriorityCount = [
                { name: 'highPriority', count: firstPriority },
                { name: 'mediumPriority', count: secondPriority },
                { name: 'lowPriority', count: thirdPriority }
            ];
            return res.status(200).json({ status: '200', message: "Prioity wise tasks for Admin fetched successfully", response: taskPriorityCount });
        } else {
            const assigneeTasks = await assignUserModel.find({ assigneeId: req.user._id });
            let taskIds = assigneeTasks.map(id => id.taskId);

            const firstPriority = await taskModel.countDocuments({ _id: { $in: taskIds }, priority: 1 });
            const secondPriority = await taskModel.countDocuments({ _id: { $in: taskIds }, priority: 2 });
            const thirdPriority = await taskModel.countDocuments({ _id: { $in: taskIds }, priority: 3 });

            const taskPriorityCount = [
                { name: 'highPriority', count: firstPriority },
                { name: 'mediumPriority', count: secondPriority },
                { name: 'lowPriority', count: thirdPriority }
            ];
            return res.status(200).json({ status: '200', message: 'Priority wise tasks for User fetched successfully', response: taskPriorityCount })
        }
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Get overview of tasks Status Count 
const getTasksStatusCount = async (req, res) => {
    try {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Calculate the date 7 days ago

        if (req.user.role === 1) {
            const todoCount = await taskModel.countDocuments({ status: 1, createdAt: { $gte: sevenDaysAgo } });
            const inProgressCount = await taskModel.countDocuments({ status: 2, createdAt: { $gte: sevenDaysAgo } });
            const holdCount = await taskModel.countDocuments({ status: 3, createdAt: { $gte: sevenDaysAgo } });
            const doneCount = await taskModel.countDocuments({ status: 4, createdAt: { $gte: sevenDaysAgo } });

            const taskStatusCount = [
                { name: 'todo', count: todoCount },
                { name: 'inProgress', count: inProgressCount },
                { name: 'hold', count: holdCount },
                { name: 'Done', count: doneCount }
            ];
            return res.status(200).json({ status: '200', message: "Tasks count for Admin fetched successfully", response: taskStatusCount });
        } else {
            const assigneeTasks = await assignUserModel.find({ assigneeId: req.user._id });
            let taskIds = assigneeTasks.map(id => id.taskId);

            const todoCount = await taskModel.countDocuments({ _id: { $in: taskIds }, status: 1, createdAt: { $gte: sevenDaysAgo } });
            const inProgressCount = await taskModel.countDocuments({ _id: { $in: taskIds }, status: 2, createdAt: { $gte: sevenDaysAgo } });
            const holdCount = await taskModel.countDocuments({ _id: { $in: taskIds }, status: 3, createdAt: { $gte: sevenDaysAgo } });
            const doneCount = await taskModel.countDocuments({ _id: { $in: taskIds }, status: 4, createdAt: { $gte: sevenDaysAgo } });

            const taskStatusCount = [
                { name: 'todo', count: todoCount },
                { name: 'inProgress', count: inProgressCount },
                { name: 'hold', count: holdCount },
                { name: 'Done', count: doneCount }
            ];
            return res.status(200).json({ status: '200', message: "Tasks count for User fetched successfully", response: taskStatusCount });
        }
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Get count of all tasks
const getTasksCount = async (req, res) => {
    try {
        if (req.user.role === 1) {
            const tasksCount = await taskModel.countDocuments();
            return res.status(200).json({ status: '200', message: "Tasks count for admin fetched successfully", response: { tasksCount } });
        }
        else {
            const assigneeTasks = await assignUserModel.find({ assigneeId: req.user._id });
            let taskIds = assigneeTasks.map(id => id.taskId);

            const tasksCount = await taskModel.countDocuments({ _id: { $in: taskIds } });
            return res.status(200).json({ status: '200', message: "Tasks count for user fetched successfully", response: { tasksCount } });
        }
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Get count of Done, updated, Created, and dueTasks of last 7 days
const getTasksWeekCount = async (req, res) => {
    try {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Calculate the date 7 days ago

        if (req.user.role === 1) {
            const doneCount = await taskModel.countDocuments({ status: 4, createdAt: { $gte: sevenDaysAgo } });
            const updatedCount = await taskModel.aggregate([
                {
                    $match: {
                        updatedAt: { $gte: sevenDaysAgo },
                    },
                },
                {
                    $addFields: {
                        updatedAtDate: {
                            $toDate: "$updatedAt",
                        },
                    },
                },
                {
                    $match: {
                        $expr: { $ne: ["$createdAt", "$updatedAtDate"] },
                    },
                },
                {
                    $count: "updatedCount",
                },
            ]);
            const result = updatedCount.length > 0 ? updatedCount[0].updatedCount : 0;

            const createdCount = await taskModel.countDocuments({ createdAt: { $gte: sevenDaysAgo } })
            const dueCount = await taskModel.countDocuments({ dueDate: { $lte: now, $gte: sevenDaysAgo } });
            return res.status(200).json({ status: '200', message: "Tasks count fetched successfully", response: { doneCount, updatedCount: result, createdCount, dueCount } });
        }
        else {
            const assigneeTasks = await assignUserModel.find({ assigneeId: req.user._id });
            let taskIds = assigneeTasks.map(id => id.taskId);

            const doneCount = await taskModel.countDocuments({ _id: { $in: taskIds }, status: 4, createdAt: { $gte: sevenDaysAgo } });
            const updatedCount = await taskModel.aggregate([
                {
                    $match: {
                        _id: { $in: taskIds },
                        updatedAt: { $gte: sevenDaysAgo },
                    },
                },
                {
                    $addFields: {
                        updatedAtDate: {
                            $toDate: "$updatedAt",
                        },
                    },
                },
                {
                    $match: {
                        $expr: { $ne: ["$createdAt", "$updatedAtDate"] },
                    },
                },
                {
                    $count: "updatedCount",
                },
            ]);
            const result = updatedCount.length > 0 ? updatedCount[0].updatedCount : 0;

            const createdCount = await taskModel.countDocuments({ _id: { $in: taskIds }, createdAt: { $gte: sevenDaysAgo } });
            const dueCount = await taskModel.countDocuments({ _id: { $in: taskIds }, dueDate: { $lte: now, $gte: sevenDaysAgo } });
            return res.status(200).json({ status: '200', message: "Tasks count fetched successfully", response: { doneCount, updatedCount: result, createdCount, dueCount } });
        }
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

module.exports = {
    createtask,
    getTasks,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskActiveStatus,
    getTasksAccToStatus,
    getPriorityTasks,
    getTasksStatusCount,
    getTasksCount,
    getTasksWeekCount
};
