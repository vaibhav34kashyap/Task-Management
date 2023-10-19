const sprintModel = require('../models/sprint');
const taskModel = require('../models/task.model')

// Get all sprints WRT status
const getSprints = async (req, res) => {
    try {
        const sprints = await sprintModel.find({ status: req.query.status }).populate('milestone_id', 'title').sort({ createdAt: -1 });
        return res.status(200).json({ status: '200', message: 'Sprints Data fetched successfully', response: sprints });
    } catch (err) {
        return res.status(200).json({ status: '404', message: 'Something went wrong' });
    }
}

// Get A sprint by ID
const getSprintById = async (req, res) => {
    try {
        const sprint = await sprintModel.findById({ _id: req.query.sprintId });
        return res.status(200).json({ status: '200', message: 'Sprint data fetched successfully', response: sprint })
    } catch (error) {
        return res.status(200).json({ status: '404', message: 'Something went wrong' });
    }
}

const getAllTaskBySprint = async (req, res) => {
    const sprint_id = req.body.sprint_id
    try {
        const result = await taskModel.find({
            $and: [
                { sprint_id: sprint_id },
            ]
        });
        if (result) {
            return res.status(200).json({ status: '200', task: result, message: 'Success' });
        } else {
            return res.status(200).json({ status: '400', message: 'Data not found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '404', message: 'Something went wrong' });
    }
}
const addSprint = async (req, res) => {

    try {
        let { sprintName, sprintDesc, startDate, endDate, milestone_id, sprintStatus, project_id } = req.body;
        let result = await sprintModel.create({
            sprintName: sprintName,
            sprintDesc: sprintDesc,
            startDate: startDate,
            endDate: endDate,
            milestone_id: milestone_id,
            project_id: project_id,
            sprintStatus: sprintStatus,
            deleteStatus: true
        })
        if (result) {
            return res.status(200).json({ status: '200', message: 'Sprint added' })
        } else {
            return res.status(200).json({ status: '400', message: 'Not added' })
        }

    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: err });
    }
}

// Update a Sprint
const updateSprint = async (req, res) => {
    try {
        await sprintModel.findByIdAndUpdate({_id : req.body.sprintId}, req.body, { new: true });
        return res.status(200).json({ status: '200', message: 'Sprints updated Successfully'})
    } catch (error) {
        return res.status(200).json({ status: '404', message: 'Something went wrong' });
    }
}

// update sprint status
const updateStatus = async (req, res) => {
    try {
        await sprintModel.findByIdAndUpdate({ _id: req.body.id }, { status: req.body.status })
        return res.status(200).json({ status: '200', message: 'Sprint status updated Successfully' });
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: message.error })
    }
}

// To get all sprints of a milestone
const getAMilestoneAllSprints = async (req, res) => {
    try {
        const result = await sprintModel.find({ $and: [{ milestone_id: req.query.id }, { status: req.query.status }] }).sort({ createdAt: -1 });
        return res.status(200).json({ status: '200', message: "ALL sprints fecteched successfully", Response: result })
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: message.error })
    }
}

module.exports = { getSprints, getSprintById, addSprint, updateSprint, updateStatus, getAllTaskBySprint, getAMilestoneAllSprints }
