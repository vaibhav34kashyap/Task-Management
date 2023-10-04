const mongoose = require('mongoose'), { Schema } = mongoose,

    sprintSchema = new Schema({
        sprintName: {
            type: String,
            required: true
        },
        sprintDesc: {
            type: String,
            required: false
        },
        startDate: {
            type: Date,
            required: false
        },
        endDate: {
            type: Date,
            required: false
        },
        milestone_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref:'milestone'
        },
        project_id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        sprintStatus: {
            type: Number,
            required: true
        },
        deleteStatus: {
            type: Boolean,
        },
    },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model('sprint', sprintSchema)