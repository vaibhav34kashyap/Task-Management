const mongoose = require('mongoose'), { Schema } = mongoose,

    milestoneModel = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        start_date: {
            type: Date,
            required: true
        },
        completion_date: {
            type: Date,
            required: true
        },
        project_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref:'projects',
        },
        status: {
            type: String,
            required : true
        },
        deleteStatus: {
            type: Boolean
        }
    },
        {
            timestamps: true
        }
    )

module.exports = mongoose.model('milestone',milestoneModel)