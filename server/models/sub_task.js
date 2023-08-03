const mongoose = require('mongoose'), { Schema } = mongoose,

    subTaskSchema = new Schema({
        parent_task_id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        task_name: {
            type: String,
            required: true
        },
        task_summary: {
            type: String,
            required: false
        },
        project_id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        task_type_id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        sprint_id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        status: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        original_estimate: {
            type: String,
            required: false
        },
        start_time: {
            type: String,
            required: false,
        },
        end_time: {
            type: String,
            required: false,
        },
        actual_time: {
            type: String,
            required: false
        },
        due_date: {
            type: Date,
            required: false
        },
        assignee_id: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        assignee_name: {
            type: String,
            required: false
        },
        create_task_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        lables_id: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        attachment: {
            type: String,
            required: false
        },
        deleteStatus: {
            type: Boolean
        }
    },
        {
            timestamps: true
        }
    )

module.exports = mongoose.model('sub_task', subTaskSchema);