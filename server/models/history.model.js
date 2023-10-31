const mongoose = require('mongoose');

const HistoryTypeEnum = {
    // Define your enum values here
    // For example:
    CREATED: 'created',
    UPDATED: 'updated',
    DELETED: 'deleted',
};

const history = mongoose.model(
    'History', mongoose.Schema({
        type: {
            type: String,
            enum: Object.values(HistoryTypeEnum),
            required: true,
        },
        taskId: {
            type: mongoose.Types.ObjectId,
            ref: 'Task'
        },
        assigneeId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        reporterId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        previousStatus: {
            type: Number
        },
        currentStatus: {
            type: Number
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
        {
            timestamps: true
        }
    )
);
module.exports = history;