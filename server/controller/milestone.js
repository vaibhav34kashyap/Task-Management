// const milestoneModel = require('../models/milestone');
// const taskmmodel = require('../models/task');
// const showAllMilestone = async (req, res) => {
//     try {
//         const milestone = await milestoneModel.find();
//         if (milestone.length > 0) {
//             res.status(200).json({ status: "200", data: milestone, message: "milestone" })
//         } else {
//             res.status(200).json({ status: "404", data: milestone, message: "Not Found" })
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(200).json({ status: "500", message: "something went wrong" })
//     }
// }
// const InprogressMilestone = async (req, res) => {
//     try {
//         const milestone = await milestoneModel.find({ status: 'in-progress' })
//         if (milestone.length > 0) {
//             res.status(200).json({ status: "200", data: milestone, message: "In-progress milestone" })
//         } else {
//             res.status(200).json({ status: "404", data: milestone, message: "Not Found" })
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(200).json({ status: "500", message: "something went wrong" })
//     }
// }
// const getSingleMileston = async (req, res) => {
//     try {
//         const milestoneData = await milestoneModel.findById({ _id: req.params.id })
//         if (milestoneData) {
//             res.status(200).json({ status: "200", data: milestoneData, message: "Milestone get successfully!" })
//         } else {
//             res.status(200).json({ status: "404", message: "Not Found" })
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(200).json({ status: "500", message: "something went wrong" })
//     }
// }
// const getMilestoneById = async (req, res) => {
//     try {
//         const milestoneData = await taskmmodel.find({ milestone_id: req.body.milestone_id })
//         if (milestoneData.length > 0) {
//             res.status(200).json({ status: "200", data: milestoneData, message: "Milestone" })
//         } else {
//             res.status(200).json({ status: "404", message: "Not Found" })
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(200).json({ status: "500", message: "something went wrong" })
//     }
// }
// const addMilestone = async (req, res) => {
//     try {
//         const objData = {
//             title: req.body.title,
//             description: req.body.description,
//             start_date: req.body.start_date,
//             completion_date: req.body.completion_date,
//             project_id: req.body.project_id,
//             status: "new",
//             deleteStatus: true
//         }
//         const existingtitle = await milestoneModel.findOne({ title: objData.title })
//         if (existingtitle) {
//             res.status(200).json({ status: "400", message: "Title Already exist" })
//         } else {
//             const result = await milestoneModel.create(objData);
//             res.status(200).json({ status: "200", data: result, message: "milestone added" })
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(200).json({ status: "500", message: "something went wrong" })
//     }
// }
// const updateMilestone = async (req, res) => {
//     try {
//         console.log("i am working==")
//         const _id = req.body.id
//         const existingtitle = await milestoneModel.findOne({ title: req.body.title })
//         if (existingtitle) {
//             res.status(200).json({ status: "400", message: "Title Already exist" })
//         } else {
//             const result = await milestoneModel.findByIdAndUpdate(_id, req.body);
//             res.status(200).json({ status: "400", data: result, message: "Updated " })
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(200).json({ status: "500", message: "something went wrong" })
//     }
// }
// const deleteMilestone = async (req, res) => {
//     // try {
//     //     const result = await milestoneModel.findByIdAndUpdate({ _id: req.body.id }, { deleteStatus: false });
//     //     res.status(200).json({ status: "200", message: "deleted milestone" })
//     // } catch (err) {
//     //     console.log(err);
//     //     res.status(200).json({ status: "500", message: "something went wrong" })
//     // }

//     try {
//         // const _id = req.body._id
//         let result = await milestoneModel.findByIdAndUpdate({ _id: req.params.id }, { deleteStatus: false });
//         if (result) {
//             return res.status(200).json({ status: '200', message: 'Milestone Deleted' });
//         } else {
//             return res.status(200).json({ status: '400', message: 'Not Found' });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(200).json({ status: '500', message: 'Something went wrong' })
//     }
// }

// module.exports = {
//     showAllMilestone, InprogressMilestone, getMilestoneById,
//     addMilestone, updateMilestone, deleteMilestone, getSingleMileston
// }


const milestoneModel = require('../models/milestone');
const taskmmodel = require('../models/task');
const showAllMilestone = async (req, res) => {
    try {
        const milestone = await milestoneModel.find({deleteStatus:true});
        console.log(milestone,"====")
        if (milestone.length > 0) {
            res.status(200).json({ status: "200", data: milestone, message: "milestone" })
        } else {
            res.status(200).json({ status: "404", data: milestone, message: "Not Found" })
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({ status: "500", message: "something went wrong" })
    }
}
const InprogressMilestone = async (req, res) => {
    try {
        const milestone = await milestoneModel.find({ status: 'in-progress' })
        if (milestone.length > 0) {
            res.status(200).json({ status: "200", data: milestone, message: "In-progress milestone" })
        } else {
            res.status(200).json({ status: "404", data: milestone, message: "Not Found" })
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({ status: "500", message: "something went wrong" })
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
        console.log(err);
        res.status(200).json({ status: "500", message: "something went wrong" })
    }
}
const getMilestoneById = async (req, res) => {
    try {
        const milestoneData = await taskmmodel.find({ milestone_id: req.body.milestone_id })
        if (milestoneData.length > 0) {
            res.status(200).json({ status: "200", data: milestoneData, message: "Milestone" })
        } else {
            res.status(200).json({ status: "404", message: "Not Found" })
        }
    } catch (err) {
        console.log(err);
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
            status: "new",
            deleteStatus: true
        }
        const existingtitle = await milestoneModel.findOne({ title: objData.title })
        if (existingtitle) {
            res.status(200).json({ status: "400", message: "Title Already exist" })
        } else {
            const result = await milestoneModel.create(objData);
            res.status(200).json({ status: "200", data: result, message: "milestone added" })
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({ status: "500", message: "something went wrong" })
    }
}
const updateMilestone = async (req, res) => {
    try {
        const _id = req.body.id
        const existingtitle = await milestoneModel.findOne({ title: req.body.title });
        if (existingtitle) {
            res.status(200).json({ status: "400", message: "Title Already exist" })
        } else {
            const result = await milestoneModel.findByIdAndUpdate({ _id: req.body._id }, req.body, { option: true });
            res.status(200).json({ status: "400", data: result, message: "Updated " })
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({ status: "500", message: "something went wrong" })
    }
}
const deleteMilestone = async (req, res) => {
    // try {
    //     const result = await milestoneModel.findByIdAndUpdate({ _id: req.body.id }, { deleteStatus: false });
    //     res.status(200).json({ status: "200", message: "deleted milestone" })
    // } catch (err) {
    //     console.log(err);
    //     res.status(200).json({ status: "500", message: "something went wrong" })
    // }
    try {
        // const _id = req.body._id
        let result = await milestoneModel.findByIdAndUpdate({ _id: req.params.id }, { deleteStatus: false });
        console.log(result,"====resulte====")
        if (result) {
            return res.status(200).json({ status: '200', message: 'Milestone Deleted' });
        } else {
            return res.status(200).json({ status: '400', message: 'Not Found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

module.exports = {
    showAllMilestone, InprogressMilestone, getMilestoneById,
    addMilestone, updateMilestone, deleteMilestone, getSingleMileston
}