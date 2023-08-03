const express = require('express');
const taskRouter = express.Router();
const tasks = require('../controller/task')
taskRouter.post("/createtask",tasks.upladFile.array('images',5),tasks.createtask);
taskRouter.get("/taskdetails",tasks.taskdetails);
taskRouter.post("/getsingletask",tasks.getSingleTaskById);
taskRouter.put("/updatetaskdetails",tasks.updatetaskdetails);
taskRouter.delete("/deletetask",tasks.deleteTask);
taskRouter.delete("/deleteimage",tasks.deleteImage);
taskRouter.put("/assigntask",tasks.assigntaskuser);
taskRouter.post("/statusupdate",tasks.taskstatusupdate);
taskRouter.post("/pendingtask",tasks.userPendingTask)
// taskRouter.get("/downloadTimeSheet", downloadTimeSheetfun);
module.exports = taskRouter;