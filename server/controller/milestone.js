const milestoneModel = require('../models/milestone');
const taskmmodel = require('../models/task.model');

// Get all Milestones WRT status
const getMilestones = async (req, res) => {
    try {
        const milestone = await milestoneModel.find({ status: req.query.status }).sort({ createdAt: -1 });
        return res.status(200).json({ status: '200', message: 'Milestones fetched successfully', response: milestone })
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: message.error })
    }
}


const getSingleMileston = async (req, res) => {
    try {
        const milestoneData = await milestoneModel.findById({ _id: req.params.id })
        if (milestoneData) {
            res.status(200).json({ status: "200", data: milestoneData, message: "Milestone get successfully!" })
        } else {
            res.status(200).json({ status: "404", message: "Not Found" })
        }
    } catch (err) {
        res.status(200).json({ status: "500", message: "something went wrong" })
    }
}

const addMilestone = async (req, res) => {
    try {
        const objData = {
            title: req.body.title,
            description: req.body.description,
            start_date: req.body.start_date,
            completion_date: req.body.completion_date,
            project_id: req.body.project_id,
        }
        const existingtitle = await milestoneModel.findOne({ title: objData.title })
        if (existingtitle) {
            res.status(200).json({ status: "400", message: "Title Already exist" })
        } else {
            const result = await milestoneModel.create(objData);
            res.status(200).json({ status: "200", data: result, message: "milestone added" })
        }
    } catch (err) {
        res.status(200).json({ status: "500", message: "something went wrong" })
    }
}

const updateMilestone = async (req, res) => {
    try {
        const milestoneId = req.body._id;
        if (req.body.title) {
            const existingTitle = await milestoneModel.findOne({ title: req.body.title, _id: { $ne: milestoneId } });
            if (existingTitle) {
                res.status(200).json({ status: "400", message: "Title already exists" });
                return;
            }
        }
        const result = await milestoneModel.findByIdAndUpdate(milestoneId, req.body, { new: true });
        if (result) {
            res.status(200).json({ status: "200", data: result, message: "Updated" });
        } else {
            res.status(200).json({ status: "404", message: "Milestone not found" });
        }
    } catch (err) {
        res.status(500).json({ status: "500", message: "Something went wrong" });
    }
}

// update Milestone status
const updateStatus = async (req, res) => {
    try {
        await milestoneModel.findByIdAndUpdate({ _id: req.body.id }, { status: req.body.status });
        return res.status(200).json({ status: '200', message: 'Milestone status updated Successfully' });
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: message.error })
    }
}

// Get all milestones of a project
const getAProjectMilestones = async (req, res) => {
    try {
        const result = await milestoneModel.find({ $and: [{ project_id: req.query.id }, { status: req.query.status }] }).sort({ createdAt: -1 });
        return res.status(200).json({ status: "200", message: "All milestones fetched successfully", Response: result });
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: message.error });
    }
}


module.exports = {
    getMilestones,
    addMilestone, updateMilestone, updateStatus, getSingleMileston, getAProjectMilestones
}