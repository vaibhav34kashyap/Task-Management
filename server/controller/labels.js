const labelSchema = require('../models/label');
const labels = async (req, res) => {
    try {
        const result = await labelSchema.find();
        if (result) {
            return res.status(200).json({ status: '200', data: result });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' });
    }
}
const addlabels = async (req, res) => {
    try {
        const labelObj = {
            label: req.body.label,
            label_desc: req.body.label_desc,
            status: req.body.status,
        }
        const existlabel = await labelSchema.findOne({ label: labelObj.label });
        if (!existlabel) {
            const result = await labelSchema.create(labelObj);
            return res.status(200).json({ status: '200', data: result, message: 'label added' });
        } else {
            return res.status(200).json({ status: '400', message: 'label name already exist' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' });
    }
}
const updatelabel = async (req, res) => {
    try {
        const labelId = req.body._id;
        const result = await labelSchema.findByIdAndUpdate(labelId , req.body);
        return res.status(200).json({ status: '200', data: result, message: 'label updated' });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' });
    }
}

module.exports = { labels, addlabels, updatelabel }