const commentsModel = require('../models/comments.model');

// Add a Comment to a task
const addComment = async (req, res) => {
    try {
        const result = await commentsModel.create({
            taskId: req.body.taskId,
            comment: req.body.comment
        })
        return res.status(200).json({ status: "200", message: "Comment added Successfully", response: result });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

// Get A task's Comments
const getTaskComment = async (req, res) => {
    try {
        const result = await commentsModel.find({ taskId: req.query.taskId });
        return res.status(200).json({ status: "200", message: "Comments fetched Successfully", response: result });
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}


module.exports = { addComment, getTaskComment }