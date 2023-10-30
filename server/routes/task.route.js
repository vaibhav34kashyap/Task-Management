const express = require('express');
const taskRouter = express.Router();
const tasks = require('../controller/task.controller');
const { verifyAdmin, verifyUser } = require('../middleware/jwt.auth');
const { taskAttachmentUpload } = require('../middleware/multer');

taskRouter.post("/createtask", verifyUser, taskAttachmentUpload.single('attachment'), tasks.createtask);
taskRouter.get("/getTasks", verifyUser, tasks.getTasks);
taskRouter.put("/updateTask", verifyAdmin, taskAttachmentUpload.single('attachment'), tasks.updateTask);
taskRouter.delete("/deletetask", verifyAdmin, tasks.deleteTask);
taskRouter.put("/updateTaskStatus", verifyUser, tasks.updateTaskStatus);
taskRouter.put("/updateTaskActiveStatus", verifyAdmin, tasks.updateTaskActiveStatus);
taskRouter.get("/getTasksAccToStatus", verifyUser, tasks.getTasksAccToStatus);
taskRouter.get("/getPriorityTasks", tasks.getPriorityTasks);
taskRouter.get("/getTasksStatusOverview", tasks.getTasksStatusOverview);

module.exports = taskRouter;