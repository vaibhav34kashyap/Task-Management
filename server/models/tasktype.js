const mongoose = require('mongoose'), {Schema} = mongoose,

taskTypeSchema = new Schema({
    typename : {
        type : String,
        required : true
    },
    type: {
        type: Number,
        required: true
    },
    typedesc: {
        type: String,
        required : false
    },
    status: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('tasktype',taskTypeSchema);