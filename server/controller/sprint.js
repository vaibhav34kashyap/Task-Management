// const sprintModel = require('../models/sprint');
// const taskModel = require('../models/task')
// const getSprint = async (req, res) => {

//     try {
//         const result = await sprintModel.find();
//         if (result) {
//             return res.status(200).json({ status: '200', data: result, message: 'Get all sprint' })
//         } else {
//             return res.status(200).json({ status: '400', message: 'Error' })
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(200).json({ status: '404', message: 'Something went wrong' });
//     }
// }
// const getSprintById = async (req, res) => {
//     const id = req.body._id
//     try {
//         const result = await sprintModel.findById({ _id: req.params.id });
//         console.log(result,"====")
//         if (result) {
//             return res.status(200).json({ status: '200', data: result, message: 'Success' });
//         } else {
//             return res.status(200).json({ status: '400', message: 'Error' });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(200).json({ status: '404', message: 'Something went wrong' });
//     }
// }
// const sigleMilestoneSprints = async (req, res) => {
//     const milestone_id = req.body.milestone_id
//     try {
//         const result = await sprintModel.find({
//             $and: [
//                 { milestone_id: milestone_id }, { deleteStatus: true },
//             ]
//         });
//         if (result) {
//             return res.status(200).json({ status: '200', sprint: result, message: 'Success' });
//         } else {
//             return res.status(200).json({ status: '400', message: 'Data not found' });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(200).json({ status: '404', message: 'Something went wrong' });
//     }
// }
// const getAllTaskBySprint = async (req, res) => {
//     const sprint_id = req.body.sprint_id
//     try {
//         const result = await taskModel.find({
//             $and: [
//                 { sprint_id: sprint_id }, { deleteStatus: true },
//             ]
//         });
//         if (result) {
//             return res.status(200).json({ status: '200', task: result, message: 'Success' });
//         } else {
//             return res.status(200).json({ status: '400', message: 'Data not found' });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(200).json({ status: '404', message: 'Something went wrong' });
//     }
// }
// const addSprint = async (req, res) => {

//     try {
//         let { sprintName, sprintDesc, startDate, endDate, milestone_id, sprintStatus, project_id } = req.body;
//         let result = await sprintModel.create({
//             sprintName: sprintName,
//             sprintDesc: sprintDesc,
//             startDate: startDate,
//             endDate: endDate,
//             milestone_id: milestone_id,
//             project_id: project_id,
//             sprintStatus: sprintStatus,
//             deleteStatus: true
//         })
//         if (result) {
//             return res.status(200).json({ status: '200', message: 'Sprint added' })
//         } else {
//             return res.status(200).json({ status: '400', message: 'Not added' })
//         }

//     } catch (err) {
//         console.log(err);
//         return res.status(200).json({ status: '500', message: 'Something went wrong', error: err });
//     }
// }
// const updateSprint = async (req, res) => {
//     try {
//         let _id = req.body._id;
//         const result = await sprintModel.findByIdAndUpdate(_id, req.body)
//         return res.status(200).json({ status: '200', result, message: 'Updated sprint' });

//     } catch (err) {
//         console.log(err);
//         return res.status(200).json({ status: '404', message: 'Something went wrong' });
//     }
// }
// const deleteSprint = async (req, res) => {
//     try {
//         let _id = req.body._id;
//         const result = await sprintModel.findByIdAndUpdate({ _id: req.params.id }, { deleteStatus: false })
//         return res.status(200).json({ status: '200', message: 'Sprint Deleted' });
//     } catch (err) {
//         console.log(err);
//         return res.status(200).json({ status: '500', message: 'Something went wrong' });
//     }
// }

// module.exports = { getSprint, getSprintById, addSprint, updateSprint, deleteSprint, sigleMilestoneSprints, getAllTaskBySprint }



const sprintModel = require('../models/sprint');
const taskModel = require('../models/task')
const getSprint = async (req, res) => {

    try {
        const result = await sprintModel.find({deleteStatus:true});
        if (result) {
            return res.status(200).json({ status: '200', data: result, message: 'Get all sprint' })
        } else {
            return res.status(200).json({ status: '400', message: 'Error' })
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '404', message: 'Something went wrong' });
    }
}
const getSprintById = async (req, res) => {
    const id = req.body._id
    try {
        const result = await sprintModel.findById({ _id: req.params.id });
        console.log(result,"====")
        if (result) {
            return res.status(200).json({ status: '200', data: result, message: 'Success' });
        } else {
            return res.status(200).json({ status: '400', message: 'Error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '404', message: 'Something went wrong' });
    }
}
const sigleMilestoneSprints = async (req, res) => {
    const milestone_id = req.body.milestone_id
    try {
        const result = await sprintModel.find({
            $and: [
                { milestone_id: milestone_id }, { deleteStatus: true },
            ]
        });
        if (result) {
            return res.status(200).json({ status: '200', sprint: result, message: 'Success' });
        } else {
            return res.status(200).json({ status: '400', message: 'Data not found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '404', message: 'Something went wrong' });
    }
}
const getAllTaskBySprint = async (req, res) => {
    const sprint_id = req.body.sprint_id
    try {
        const result = await taskModel.find({
            $and: [
                { sprint_id: sprint_id }, { deleteStatus: true },
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
const updateSprint = async (req, res) => {
    try {
        let _id = req.body._id;
        const result = await sprintModel.findByIdAndUpdate(_id, req.body)
        return res.status(200).json({ status: '200', result, message: 'Updated sprint' });

    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '404', message: 'Something went wrong' });
    }
}
const deleteSprint = async (req, res) => {
    try {
        // let _id = req.body._id;
        const result = await sprintModel.findByIdAndUpdate({ _id: req.params.id }, { deleteStatus: false })
        return res.status(200).json({ status: '200', message: 'Sprint Deleted' });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' });
    }
}

const getAllSprints = async(req,res) => {
    try {
        const result = await sprintModel.find();
        return res.status(200).json({status : '200', message : "ALL sprints fecteched successfully", Response : result})
    } catch (error) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' });
    }
}

module.exports = { getSprint, getSprintById, addSprint, updateSprint, deleteSprint, sigleMilestoneSprints, getAllTaskBySprint, getAllSprints }