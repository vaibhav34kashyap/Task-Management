const activitySchema = require('../models/activity');
const taskSchema = require('../models/task');
const subtaskSchema = require('../models//sub_task');
const { default: mongoose } = require('mongoose');
const addtaskActivity = async (req, res) => {
    try {
        const _id = mongoose.Types.ObjectId(req.params.taskid);
        let data = await taskSchema.findById({ _id: _id });
        const projectId = data.project_id;
        const create_task_id = data.create_task_id;
        const task_create_time = data.createdAt;
        const time = new Date();

        const Result = await activitySchema.findOne({ task_id: _id })
        const dataObj = {
            emp_id: req.body.emp_id,
            project_id: projectId,
            task_id: _id,
            timeSpent: time,
            task_create_time: task_create_time,
            create_task_id: create_task_id,
            status: ""
        }
        if (req.body.status === 'commented'){
            dataObj.comment = req.body.status;
            const data = await activitySchema.create(dataObj)
            return res.status(200).json({ status: '200', data: data, message: 'Activity Comment Added Successfully' })
        }
        if (!Result) {
            const data = await activitySchema.create(dataObj);
            return res.status(200).json({ status: '200', data: data, message: 'Activity Added Successfully' })
        } else {
            dataObj.status = Result.status + ',' + req.body.status
            const data = await activitySchema.updateOne({ task_id: _id }, dataObj)
            return res.status(200).json({ status: '500', data: data, message: 'Activity updated Successfully' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' });
    }
}

const addSubTaskActivity = async (req, res) => {
    try {
        const _id = mongoose.Types.ObjectId(req.params.taskid);
        let data = await subtaskSchema.findOne({ parent_task_id : _id });
 
        const projectId = data.project_id;
        const create_task_id = data.create_task_id;
        const task_create_time = data.createdAt;
        const time = new Date();

        const Result = await activitySchema.findOne({ task_id: _id })
        const dataObj = {
            emp_id: req.body.emp_id,
            project_id: projectId,
            task_id: _id,
            timeSpent: time,
            task_create_time: task_create_time,
            create_task_id: create_task_id,
            status: req.body.status
        }
        if (!Result) {
            const data = await activitySchema.create(dataObj);
            return res.status(200).json({ status: '200', data: data, message: 'Activity Added Successfully' })
        } else {
            dataObj.status = Result.status + ',' + req.body.status
            const data = await activitySchema.updateOne({ task_id: _id }, dataObj)
            return res.status(200).json({ status: '500', data: data, message: 'Activity updated Successfully' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' });
    }
}


module.exports = { addtaskActivity, addSubTaskActivity }