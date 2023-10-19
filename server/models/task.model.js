const mongoose = require('mongoose');

const tasks = mongoose.model(
    'Task', mongoose.Schema({
        projectId: {
            type: mongoose.Types.ObjectId,
            ref: 'projects'
        },
        milestoneId: {
            type: mongoose.Types.ObjectId,
            ref: 'milestone'
        },
        sprintId: {
            type: mongoose.Types.ObjectId,
            ref: 'sprint'
        },
        summary: {
            type: String
        },
        description: {
            type: String
        },
        assigneeId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        reporterId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        priority: {
            type: Number // 1=high, 2=medium, 3=low
        },
        startDate: {
            type: Date
        },
        dueDate: {
            type: Date
        },
        status: {
            type: Number,
            default: 1 // 1=,todo, 2=inProgress, 3=done, 4=review, 
        },
        activeStatus: {
            type: Boolean,
            default: true
        }
    },
        {
            timestamps: true
        }
    )
);
module.exports = tasks;
