const mongoose = require('mongoose'), { Schema } = mongoose,

userModel = new Schema({
            userName: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            role: {
                type: String,
                required: true
            },
            status: {
                type: Boolean
            }
        }, {
            timestamps : true
        }

    )

module.exports = mongoose.model('users', userModel);