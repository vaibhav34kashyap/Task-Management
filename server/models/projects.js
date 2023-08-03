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
            startDate : {
                type: Date
            },
            endDate : {
                type: Date
            },
            complitionDate : {
                type: Date
            },
            clientName : {
                type : String
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
            projectStatus:{
                type: String,
                required: false
            },
            deleteStatus: {
                type: Boolean,
            },
        },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model("projects", projectSchema);