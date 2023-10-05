const taskModel = require('../models/task');
const userModel = require("../models/login_register");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const upladFile = multer({ storage: multer.diskStorage({}) })

// Create or add tasks
const createtask = async (req, res) => {
    const files = req.files;
    const imgArray = [];
    // for (i = 0; i < files.length; i++) {
    //     const tempPath = files[i].path;
    //     const newfilepath = Date.now() + "-" + files[i].originalname;
    //     const targetPath = path.join(__dirname, `../public/assets/image/${newfilepath}`);
    //     fs.rename(tempPath, targetPath, err => { });
    //     imgArray.push(newfilepath);
    // }
    // console.log(imgArray);
    const objData = {
        task_name: req.body.task_name,
        task_summery: req.body.task_summery,
        project_id: req.body.project_id,
        sprint_id: req.body.sprint_id,
        milestone_id: req.body.milestone_id,
        module: req.body.module,
        status: req.body.status,
        task_type: req.body.task_type,
        create_task_id: req.body.create_task_id,
        description: req.body.description,
        original_estimate: req.body.original_estimate,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        actual_time: req.body.actual_time,
        due_date: new Date(req.body.due_date),
        assignee_id: req.body.assignee_id,
        labels_id: req.body.labels_id,
        // attachment: imgArray,
        deleteStatus: true
    }
    try {
        const data = await taskModel.findOne({ task_name: objData.task_name });
        if (!data) {
            const result = await taskModel.create(objData);
            return res.status(200).json({ status: "200", user: result, message: "task created successfully" });
        } else {
            return res.status(200).json({ status: "400", message: "Task name already exist" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: 'something went wrong', error });
    }
}

const taskdetails = async (req, res) => {
    try {
        const pageSize = 5;
        const totalCount = await taskModel.countDocuments({ deleteStatus: true });
        const existingtask = await taskModel.find({ deleteStatus: true })
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip((parseInt(req.query.skip) - 1) * pageSize);
        const totalPages = Math.ceil(totalCount / pageSize);

        if (!existingtask) {
            return res.status(200).json({ status: "400", message: "task not found" });
        }
        else {
            return res.status(200).json({ status: "200", data: existingtask, totalCount, totalPages });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: "Something went wrong" });
    }
}
const getSingleTaskById = async (req, res) => {
    try {
        const _id = req.body._id
        const existingtask = await taskModel.findById({ _id: _id });
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
    try {
        var _id = req.body._id;
        let result = await taskModel.findByIdAndUpdate(_id, req.body);
        if (result) {
            return res.status(200).json({ status: "200", data: result, message: "task update successfully" });
        }
        else {
            return res.status(200).json({ status: "400", message: "not updated" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: "Something went wrong" });
    }
}
const deleteTask = async (req, res,) => {
    var id = req.body.id;
    try {
        let result = await taskModel.findByIdAndUpdate({ _id: id }, { deleteStatus: false });
        if (result) {
            return res.status(200).json({ status: "200", message: "task Deleted" });
        }
        else {
            return res.status(200).json({ status: "400", message: "not found" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: "Something went wrong" });
    }
}
const deleteImage = async (req, res) => {
    try {
        const _id = req.body.taskid;
        const imgindex = req.body.imgindex;
        const data = await taskModel.findOne({ _id: _id })
        const value = data.attachment[imgindex]
        newarr = data.attachment.filter(function (item) {
            return item !== value
        })
        // console.log(newarr);
        const result = await taskModel.findByIdAndUpdate({ _id: _id }, { attachment: newarr })
        return res.status(200).json({ status: "200", message: "image deleted successfully" });
    } catch (err) {
        console.log(err);
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
        return res.status(200).json({ status: '404', message: 'Something went wrong' })
    }
}
// status - > 0 ---> pending
// status - > 1 ---> Todo
// status - > 2 ---> in progress
// status - > 3 ---> Testing
// status - > 4 ---> done
const taskstatusupdate = async (req, res) => {
    try {
        let task_Id = req.body.task_id;
        let assignee_id = req.body.assignee_id;
        let status = req.body.status;
        // const checkStatus = await taskModel.findOne({ assignee_id: assignee_id }).sort({ createdAt: -1 });
        const checkStatus = await taskModel.findOne({ assignee_id: assignee_id });

        if (checkStatus.status === 0 && status === 0) {
            return res.status(200).json({ status: '400', message: 'This user already has a pending task' });
        } else {
            const taskdata = await taskModel.findById({ _id: task_Id });
            const startTimes = new Date(taskdata.start_time);
            const changeStatus = await taskModel.findByIdAndUpdate({ _id: task_Id }, { status: status });
            if (changeStatus) {
                return res.status(200).json({ status: '200', restult: changeStatus, message: 'Status chnages' });
            }
            if (taskdata.status === 2) {
                let startTime = new Date();
                let result = await taskModel.findByIdAndUpdate({ _id: task_Id }, { start_time: startTime })
                return res.status(200).json({ status: '200', restult: result, message: 'start Time Running' });
            }
            if (taskdata.status === 4) {
                let endTime = new Date();
                await taskModel.findByIdAndUpdate({ _id: task_Id }, { end_time: endTime });
                let end = Math.abs(endTime.getTime() / 1000).toFixed(0);
                let start = Math.abs(startTimes.getTime() / 1000).toFixed(0);
                let diff = end - start;
                let days = Math.floor(diff / 86400)
                let hours = Math.floor(diff / 3600) % 24
                let minute = Math.floor(diff / 60) % 60
                let actual_time = days + ":" + hours + ":" + minute
                let data = await taskModel.findByIdAndUpdate({ _id: task_Id }, { actual_time: actual_time })
                return res.status(200).json({ status: '200', data: data, message: 'Task time updated Successfully' });
            }
        }
    } catch (err) {
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}
const userPendingTask = async (req, res) => {
    try {
        const userid = req.body.userid;
        const result = await taskModel.find({ $and: [{ assignee_id: userid }, { status: 0 }] })
        res.status(200).json({ status: "200", data: result, message: "Pending task" })
    } catch (err) {
        res.status(200).json({ status: "500", message: "Something went wrong" })
    }
}

// Get all tasks of a sprint
const getSprintTasks = async (req, res) => {
    try {
        const pageSize = 5;
        const totalCount = await taskModel.countDocuments({ sprint_id: req.query.id });
        const result = await taskModel.find({ sprint_id: req.query.id })
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip((parseInt(req.query.skip) - 1) * pageSize);
        const totalPages = Math.ceil(totalCount / pageSize);

        return res.status(200).json({ status: "200", message: "Sprint tasks fetched successfully", response: result, totalCount, totalPages });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ status: "500", message: "Something went wrong" });
    }
}

// Get tasks according to status
const getTasksAccToStatus = async (req, res) => {
    try {
        // var resp = null;
        const todo = await taskModel.find({ status: 1 })
        // res.status(200).json({ status : '200', message : "fetched successfully", Response : resp});

        const inProgress = await taskModel.find({ status: 2 });
        // res.status(200).json({ status : '200', message : "fetched successfully", Response : resp});

        const review = await taskModel.find({ status: 4 });
        // res.status(200).json({ status : '200', message : "fetched successfully", Response : resp});

        const done = await taskModel.find({ status: 3 });
        res.status(200).json({ status: '200', message: "fetched successfully", Response: todo, inProgress, review, done });
    } catch (error) {
        console.log(error);
        res.status(200).json({ status: "500", message: "Something went wrong" })
    }
}

module.exports = {
    createtask, taskdetails, updatetaskdetails, deleteTask, assigntaskuser, taskstatusupdate,
    userPendingTask, upladFile, deleteImage, getSingleTaskById, getSprintTasks, getTasksAccToStatus
};
