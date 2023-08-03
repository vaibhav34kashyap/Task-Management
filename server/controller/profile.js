const userModel = require("../models/login_register");
const bcrypt = require("bcrypt");
const profiledetails = async (req, res) => {

    var { id } = req.body;

    try {
        const existingUser = await userModel.findOne({ _id: id });
        if (!existingUser) {
            return res.status(200).json({ status: "400", message: "user not found" });
        }
        else {
            return res.status(200).json({ status: "200", user: existingUser, });

        }

    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: "Something went wrong" });
    }
};

const updatePassword = async (req, res) => {

    var id  = req.body.id;
    var password  = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password,10)
        const existingUser = await userModel.findOne({ _id: id });
        if (!existingUser) {
            return res.status(200).json({ status: "400", message: "user not found" });
        }
        else {
            const result = await  userModel.findByIdAndUpdate({ _id: id }, { password : hashedPassword })
            return res.status(200).json({ status: "200", message: "Password updated successfully.", user: result, });
        }

    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: "500", message: "Something went wrong" });
    }
};


module.exports = { profiledetails, updatePassword };
