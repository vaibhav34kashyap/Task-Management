const mongoose = require('mongoose'), { Schema } = mongoose,
    teamSchema = new Schema({
        name: {
            type: String,
            required: false
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref : 'User'
        },
        projectId: {
            type: mongoose.Types.ObjectId,
            required: false
        },
        deleteStatus: {
            type: Boolean
        }
    },{
        timestamps: true
    }
    )

module.exports = mongoose.model('Team',teamSchema);