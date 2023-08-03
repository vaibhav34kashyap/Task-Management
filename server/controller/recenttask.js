const taskModel = require('../models/task');

const recentTasks = async (req, res) => {
    try {
        _id = req.body.assignee_id;
        const data = await taskModel.find({ assignee_id : _id }).limit(10).sort( { createdAt: 1} );
        if (data !=0) {
            return res.status(200).json({ status: '200', data : data, message: 'success' });
        }
         else {
            const result = await taskModel.find().limit(10).sort( { createdAt: 1} );
            return res.status(200).json({ status: '200', data : result, message: 'success' });
        }
        
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' });
    }
}

module.exports = { recentTasks }