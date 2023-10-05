const mongoose = require('mongoose'), { Schema } = mongoose,

    projectCategorySchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false
        },
        project: {
            type: String,
            required: false
        },
        deleteStatus: {
            type: Boolean
        }
    },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model("project_category",projectCategorySchema);