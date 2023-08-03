const subtaskmodel = require('../models/sub_task')
const addSubTask = async (req, res) => {
    try {

        const dataObj = {
            parent_task_id: req.body.parent_task_id,
            task_name: req.body.task_name,
            task_summary: req.body.task_summary,
            project_id: req.body.project_id,
            task_type_id: req.body.task_type_id,
            sprint_id: req.body.sprint_id,
            status: req.body.status,
            description: req.body.description,
            original_estimate: req.body.original_estimate,
            actual_time: req.body.actual_time,
            due_date: req.body.due_date,
            assignee_id: req.body.assignee_id,
            create_task_id: req.body.create_task_id,
            lables_id: req.body.lables_id,
            attachment: req.body.attachment,
            deleteStatus: true
        }
        // console.log(dataObj);

        const existingtask = await subtaskmodel.findOne({ task_name: dataObj.task_name })

        if (!existingtask) {
            const result = await subtaskmodel.create(dataObj)
            return res.status(200).json({ status: '200', data: result, message: 'subtask created successfully' });
        } else {
            return res.status(200).json({ status: '400', message: 'Already have task name' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' });
    }
}
const taskdetails = async (req, res) => {
    try {
        const existingSubtask = await subtaskmodel.find({ deleteStatus: true });
        if (!existingSubtask) {
            return res.status(200).json({ status: "400", message: "Task not found" });
        }
        else {
            return res.status(200).json({ status: "200", data: existingSubtask, });
        }

    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: "Something went wrong" });
    }
}
const getSingleTaskById = async (req, res) => {
    try {
        const id = req.body.id;
        const existingtask = await subtaskmodel.findById({ _id: id });
        if (!existingtask) {
            return res.status(200).json({ status: "400", message: "task not found" });
        }
        else {
            return res.status(200).json({ status: "200", data: existingtask, });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: "Something went wrong" });
    }
}
const updatetaskdetails = async (req, res,) => {
    const { _id } = req.body;

    const taskid = req.params._id;

    try {
        let result = await subtaskmodel.findByIdAndUpdate(taskid, req.body);

        if (result) {
            return res.status(200).json({ status: "200", data: result, message: "task update successfully" });
        }
        else {
            return res.status(200).json({ status: "500", message: "Not Updated" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: "Something went wrong" });
    }
}
const deleteSubTask = async (req, res,) => {
    var id = req.body.id;
    try {
        let result = await subtaskmodel.findByIdAndUpdate({ _id: id }, { deleteStatus: false });

        if (result) {
            return res.status(200).json({ status: "200", message: "Delete successfully" });
        }
        else {
            return res.status(200).json({ status: "404", message: "Not Found" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: "Something went wrong" });
    }
}
const assigntaskuser = async (req, res) => {
    try {
        const taskId = req.body.task_id;
        const assignee_id = req.body.assignee_id;
        const user = await userModel.findOne({ _id: assignee_id });
        const assignee_name = user.userName;
        const task = await taskModel.findOne({ _id: taskId });
        if (task) {
            const result = await taskModel.findByIdAndUpdate(taskId, {
                assignee_id: assignee_id,
                assignee_name: assignee_name
            });
            return res.status(200).json({ status: '200', data: result, message: 'Task Assigned successfully' });
        } else {
            return res.status(200).json({ status: '400', message: 'Task not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({ status: '404', message: 'Something went wrong' })
    }
}
// status - > 0 ---> Todo
// status - > 1 ---> in progress
// status - > 2 ---> done

const taskstatusupdate = async (req, res) => {
    try {

        let taskId = req.params.taskid;

        const taskdata = await subtaskmodel.findById({ _id: taskId });
        const startTimes = taskdata.start_time;
        const endTimes = taskdata.end_time;

        if (taskdata) {
            let date = new Date();
            if (taskdata.status === 1) {
                let startTime = date.getHours() + '.' + date.getMinutes();
                let result = await subtaskmodel.findByIdAndUpdate({ _id: taskId }, { start_time: startTime })
                return res.status(200).json({ status: '200', restult: result, message: 'start Time Running' });
            }
            if (taskdata.status === 2) {
                let endTime = date.getHours() + '.' + date.getMinutes();
                let result = await subtaskmodel.findByIdAndUpdate({ _id: taskId }, { end_time: endTime });
                let totalTime = endTimes - startTimes;
                let data = await subtaskmodel.findByIdAndUpdate({ _id: taskId }, { actual_time: totalTime })
                return res.status(200).json({ status: '200', data: data, message: 'Task time updated Successfully' });
            }
        }

    } catch (err) {
        // console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

module.exports = { addSubTask, taskdetails, updatetaskdetails, deleteSubTask, assigntaskuser, taskstatusupdate, getSingleTaskById }