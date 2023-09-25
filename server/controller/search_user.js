const userModel = require('../models/login_register');

const searchUser = async (req, res) => {
    try {
        const value = req.body.searchvalue;
        const userSearch = await userModel.find({
            $or: [
                { userName: { $regex: value, $options: "i" } },
                { email: { $regex: value, $options: "i" } },
            ],
        })
        if (userSearch <= 0) {
            return res.status(200).json({ status: "400", message: 'No record found' });
        } else {
            return res.status(200).json({ status: "200", data: userSearch, message: 'Record found' });
        }

    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: "500", message: 'Something went wrong' });
    }
}

module.exports = { searchUser }