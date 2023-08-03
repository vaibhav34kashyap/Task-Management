const mongoose = require('mongoose'),

    { Schema } = mongoose,
    taskSchema = new Schema(
        {
            task_name: {
                type: String,
                required: true,
            },
            task_summery: {
                type: String,
                required: false,
            },

            project_id: {
                type: mongoose.Types.ObjectId,
                required: false,
            },

            sprint_id: {
                type: mongoose.Types.ObjectId,
                required: false,
            },

            task_type: {
                type: String,
                required: false,
            },
            milestone_id: {
                type: mongoose.Types.ObjectId,
                required: false
            },
            module: {
                type: String,
                required: false
            },
            status: {
                type: Number,
                required: false,
            },
            description: {
                type: String,
                required: false,
            },

            original_estimate: {
                type: String,
                required: false,
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
                required: false,
            },
            due_date: {
                type: Date,
                required: false,
            },
            assignee_id: {
                type: mongoose.Types.ObjectId,
                required: false,
            },
            assignee_name: {
                type: String,
                required: false,
            },
            create_task_id: {
                type: mongoose.Types.ObjectId,
                required: false,
            },
            labels_id: {
                type: mongoose.Types.ObjectId,
                required: false,
            },
            attachment: {
                type: Array,
                required: false,
            },
            deleteStatus : {
                type : Boolean
            }
        },
        {
            timestamps: true
        }
    );

module.exports = mongoose.model("task", taskSchema)
