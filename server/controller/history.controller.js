const historyModel = require('../models/history.model');

// Get History or recent activities
const getHistory = async (req, res) => {
    try {
        const result = await historyModel.find().populate('taskId', 'summary')
        return res.status(200).json({ status: "200", message: "History fetched sucessfully", response: result })
    } catch (error) {
        return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
    }
}

module.exports = { getHistory }