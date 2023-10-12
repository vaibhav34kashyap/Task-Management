const mongoose = require('mongoose'), { Schema } = mongoose,
    projectSchema = new Schema(
        {
            projectName: {
                type: String,
                required: [true, 'Project Name is required'],
            },
            clientName: {
                type: String
            },
            technology: {
                type: [mongoose.Types.ObjectId],
                ref : 'Technology'
            },
            // projectLead: {
            //     type: String,
            //     required: false
            // },
            // projectIcon: {
            //     type: String,
            // },
            startDate: {
                type: Date
            },
            endDate: {
                type: Date
            },
            projectDesc: {
                type: String,
            },
            status: {
                type: Boolean,
                default: true
            },
            projectStatus: {
                type: Number,
                default: 1 // status : 1- live, 2 : hold, 3 : completed 
            },
            project_type : {
                type : String
            }
        },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model("projects", projectSchema);