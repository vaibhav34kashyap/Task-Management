const milestoneModel = require('../models/milestone.model');

// Add a Milestone
const addMilestone = async (req, res) => {
    try {
        const { projectId, title, description, startDate, completionDate, } = req.body;

        const existingMilestoneTitle = await milestoneModel.findOne({ title: title })
        if (existingMilestoneTitle) {
            res.status(200).json({ status: "400", message: "Title Already exist" })
        } else {
            const result = await milestoneModel.create({
                projectId,
                title,
                description,
                startDate,
                completionDate
            });
            return res.status(200).json({ status: "200", message: "Milestone added Successfully", response: result });
        }
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message });
    }
}

// // Get all Milestones WRT status
// const getMilestones = async (req, res) => {
//     try {
//         const pageSize = 10;
//         const totalCount = await milestoneModel.countDocuments({ status: req.query.status });
//         const milestones = await milestoneModel.find({ activeStatus: req.query.activeStatus }).populate('projectId', 'projectName')
//             .sort({ createdAt: -1 })
//             .limit(pageSize)
//             .skip((parseInt(req.query.skip) - 1) * pageSize);
//         const totalPages = Math.ceil(totalCount / pageSize);

//         return res.status(200).json({ status: '200', message: 'Milestones Data fetched successfully', response: milestones, totalCount, totalPages })
//     } catch (error) {
//         return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message })
//     }
// }

// Get A milestone by Id
const getMilestoneById = async (req, res) => {
    try {
        const milestone = await milestoneModel.findById({ _id: req.query.milestoneId }).populate('projectId', 'projectName');
        return res.status(200).json({ status: '200', message: 'Milestone fetched successfully', response: milestone })
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message });
    }
}

// Update a Milestone
const updateMilestone = async (req, res) => {
    try {
        await milestoneModel.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
        return res.status(200).json({ status: '200', message: 'Milestone updated Successfully' });
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message })
    }
}

// update Milestone ActiveStatus
const updateStatus = async (req, res) => {
    try {
        await milestoneModel.findByIdAndUpdate({ _id: req.body.id }, { activeStatus: req.body.activeStatus });
        return res.status(200).json({ status: '200', message: 'Milestone status updated Successfully' });
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong', error: error.message })
    }
}

// Get all milestones of a project
const getAProjectMilestones = async (req, res) => {
    try {
        const pageSize = 10;
        if(parseInt(req.query.skip) ===0){
            console.log('fchgvhbjknj');
            const milestones = await milestoneModel.find({ activeStatus: req.query.activeStatus }).populate('projectId', 'projectName')
            .sort({ createdAt: -1 })
        return res.status(200).json({ status: '200', message: 'Milestones Data fetched successfully', response: milestones})
        }
        else{
        const totalCount = await milestoneModel.countDocuments({ $and: [{ projectId: req.query.id }, { activeStatus: req.query.activeStatus }] });
        const result = await milestoneModel.find({ $and: [{ projectId: req.query.id }, { activeStatus: req.query.activeStatus }] }).populate('projectId', 'projectName')
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip((parseInt(req.query.skip) - 1) * pageSize);
        const totalPages = Math.ceil(totalCount / pageSize);

        return res.status(200).json({ status: "200", message: "All milestones fetched successfully", Response: result, totalCount, totalPages });
        }}
     catch (error) {
        return res.status(500).json({ status: "500", message: 'Something went wrong', error: error.message });
    }
}


module.exports = {
     addMilestone, updateMilestone, updateStatus, getMilestoneById, getAProjectMilestones
}