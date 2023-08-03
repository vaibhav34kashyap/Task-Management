const rolesModel = require('../models/rolesModel');
const userModel = require('../models/login_register')
const addRoles = async (req, res) => {
    try {
        const objData = {
            role: req.body.role,
            permission: req.body.permission
        }
        const existRole = await rolesModel.findOne({ role: objData.role })
        if (!existRole) {
            const result = await rolesModel.create(objData);
            res.status(200).json({ status: "200", result: result, message: "Roles added" });
        } else {
            res.status(200).json({ status: "400", message: "This user role already exist" });
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({ status: "500", message: "something went wrong" });
    }
}
const updateUserRole = async (req, res) => {
    try {
        const objData = {
            userid: req.body.userid,
            role: req.body.role,
        }
        const existRole = await userModel.findOne({ _id: objData.userid })
        if (!existRole) {
            res.status(200).json({ status: "404", message: "Not Found" });
        } else {
            const result = await userModel.findByIdAndUpdate({ _id: objData.userid }, req.body)
            res.status(200).json({ status: "200", result: result, message: "Success" });
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({ status: "500", message: "something went wrong" });
    }
}
const deleteUserRole = async (req, res) => {
    const user_id = req.body.user_id;
    const role = req.body.role
    try {
        const existUser = await userModel.findById({ _id: user_id });
        if (existUser) {
            const result = await userModel.findByIdAndUpdate({ _id: user_id }, { role: role })
            res.status(200).json({ status: "200", result, message: 'Success' })
        }

    } catch (err) {
        console.log(err);
        res.status(200).json({ status: "500", message: 'Something went wrong' })
    }
}

module.exports = { addRoles, updateUserRole, deleteUserRole }