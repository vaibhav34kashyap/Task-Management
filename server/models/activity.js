const { ObjectId } = require('mongodb');

const mongoose = require('mongoose'), { Schema } = mongoose,

    activityModel = new Schema({
            emp_id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            task_id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            project_id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            timeSpent: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: false
            },
            comment: {
                type: String,
                required: false
            },
            task_create_time:{
                type: String,
                required: true
            },
            create_task_id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
        }, {
            timestamps : true
        }

    )

module.exports = mongoose.model('activity', activityModel);