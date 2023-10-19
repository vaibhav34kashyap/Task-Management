const taskTypeModel = require('../models/tasktype');
const taskType = async (req, res) => {
    try {
        const data = await taskTypeModel.find();
        return res.status(200).json({ status: '200', data: result, message: 'Task Type' })
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

const addtaskType = async (req, res) => {
    try {
        const typeObj = {
            typename: req.body.typename,
            type: req.body.type,
            typedesc: req.body.typedesc,
            status: req.body.status
        }
        const existType = await taskTypeModel.findOne({ typename: typeObj.typename });
        if (!existType) {
            const result = await taskTypeModel.create(typeObj);
            return res.status(200).json({ status: '200', message: 'Task Type Created Successfully' })
        } else {
            return res.status(200).json({ status: '400', message: 'Name already exist' })
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

const updateTaskType = async (req, res) => {
    try {
        const _id = req.body._id;
        const name = req.body.name;
        const existType = await taskTypeModel.findOne({ typename: name })
        if (!existType) {
            const result = await taskTypeModel.findByIdAndUpdate({ _id: req.body });
            return res.status(200).json({ status: '200', data: result, message: 'Task Updated Successfully' })
        } else {
            return res.status(200).json({ status: '400', message: 'Name already exist' })
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

module.exports = { addtaskType, taskType, updateTaskType }