const express = require('express');
const taskRouter = express.Router();
const tasks = require('../controller/task.controller');
const { verifyAdmin, verifyUser } = require('../middleware/jwt.auth');

taskRouter.post("/createtask", verifyUser, tasks.createtask);
taskRouter.get("/getTasks", tasks.getTasks);
taskRouter.get("/getATask", tasks.getATask);
taskRouter.put("/updateTask", tasks.updateTask);
taskRouter.delete("/deletetask", verifyAdmin, tasks.deleteTask);
taskRouter.put("/updateTaskStatus", tasks.updateTaskStatus);
taskRouter.put("/updateTaskActiveStatus", tasks.updateTaskActiveStatus);
taskRouter.get("/getSprintTasks", tasks.getSprintTasks);
taskRouter.get("/getTasksAccToStatus", tasks.getTasksAccToStatus);

module.exports = taskRouter;