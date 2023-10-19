const mongoose = require('mongoose'), { Schema } = mongoose,

    labelSchema = new Schema({
        label: {
            type: String,
            required: true
        },
        label_desc: {
            type: String,
            required: false
        },
        status: {
            type: Number,
            required: false
        },
    },
        {
            timestamps: true
        }
    )

module.exports = mongoose.model('label',labelSchema);