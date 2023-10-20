const mongoose = require('mongoose');

const comments = mongoose.model(
    'Comment', mongoose.Schema({
        taskId: {
            type: mongoose.Types.ObjectId,
            ref: ''
        },
        comment: {
            type: String
        }
    },
        {
            timestamps: true
        }
    )
);
module.exports= comments;