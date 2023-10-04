const mongoose = require('mongoose'), { Schema } = mongoose,
    projectSchema = new Schema(
        {
            projectName: {
                type: String,
                required: [true, 'Project Name is required'],
            },
            projectSlug: {
                type: String,
                required: false
            },
            projectLead: {
                type: Number,
                required: false
            },
            projectIcon: {
                type: String,
                required: false
            },
            startDate: {
                type: Date
            },
            endDate: {
                type: Date
            },
            expectedDate: {
                type: Date
            },
            complitionDate: {
                type: Date
            },
            clientName: {
                type: String
            },
            technology: {
                type: String,
                required: false
            },
            projectAccess: {
                type: Number,
                required: true
            },
            key: {
                type: String,
                required: false
            },
            projectCategory: {
                type: String,
                required: false
            },
            projectType: {
                type: Array,
                required: false
            },
            projectDesc: {
                type: String,
                required: false
            },
            status: {
                type: Boolean,
                default: true
            },
            projectStatus: {
                type: Number,
                default: 1 // status : 1- live, 2 : hold, 3 : completed 
            }
        },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model("projects", projectSchema);