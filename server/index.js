const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
require('dotenv').config();
const app = express();
app.use(cors())
app.use(express.json());
const bodyParser = require("body-parser");
const csvwriter = require('csv-writer');
const userRoutes = require("./routes/authenitcation");
const profileRoutes = require("./routes/profile");
const taskRoutes = require("./routes/task");
const projectRoute = require("./routes/projectRoute");
const sprintRoute = require("./routes/sprint");
const subtaskRoute = require("./routes/subtask");
const labelRoute = require("./routes/label");
const taskTypeRoute = require("./routes/tasktype");
const activityRoute = require("./routes/taskActivity");
const searchroute = require("./routes/searchroute");
const catRouter = require("./routes/project_category");
const recentTaskRoute = require("./routes/recenttask");
const searchUserRoute = require("./routes/search_user");
const milestoneRoute = require("./routes/milestone");
const rolesRoute = require("./routes/roles");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.use("/task", taskRoutes);
app.use("/task/subtask", subtaskRoute);
app.use("/project", projectRoute);
app.use("/sprint", sprintRoute);
app.use("/label", labelRoute);
app.use("/tasktype", taskTypeRoute);
app.use("/taskactivity", activityRoute);
app.use("/projectcategory", catRouter);
app.use("/search", searchroute);
app.use("/recenttask", recentTaskRoute);
app.use("/searchuser", searchUserRoute);
app.use("/milestone", milestoneRoute);
app.use("/roles", rolesRoute);

mongoose.set('strictQuery', false);
mongoose.connect(
 process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, database) => {
    if (!err) {
      console.log("Database connected successfully");
    } else {
      console.log(err);
    }
  }
);
const port = process.env.PORT  || 9000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

app.get('/downloadcsvfromJSON', (req, res) => {
  
  const userLogsArray= [{"id":"1","name":"BOB"},{"id":"2","name":"JACK"}];
  const path = 'sample.csv';
  const csvWriter = createCsvWriter({
    path: path,
    header: [{ id:'id',title:'ID'},{id:'name',title:'Name' }]});
    csvWriter.writeRecords(userLogsArray)
       .then(() => {res.download(path);});

  try 
  {
       csvWriter.writeRecords(userLogsArray)
       .then(() => {res.download(path);});
  }
  catch (error) 
  {
    console.log(error);
  };
});