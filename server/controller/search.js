const taskmmodel = require('../models/task');
const projectModel = require('../models/projects');
const subtaskmodel = require('../models/sub_task')
const getSearchData = async (req, res) => {
    try {
        const value = req.body.searchvalue;
        const tasks = await taskmmodel.find({
            task_name: { $regex: value, $options: "i" },
        })
        const subtasks = await subtaskmodel.find({
            task_name: { $regex: value, $options: "i" },
        })
        const projects = await projectModel.find({
            projectName: { $regex: value, $options: "i" },
        })

        let result = tasks.concat(subtasks, projects)

        if (result <= 0) {
            return res.status(200).json({ status: "400", message: 'No record found' });
        } else {
            return  res.status(200).json({ status: "200", data: result, message: 'Record found' });
        }

    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: "500", message: 'Something went wrong' });
    }
}

module.exports = { getSearchData }