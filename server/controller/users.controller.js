const userModel = require("../models/users.model");
const nodemailer = require("../middleware/nodemailer");
const bcrypt = require("bcrypt");
const { accessToken } = require("../middleware/jwt.auth");

// Register a user or invite a user 
const registerUser = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).json({ status: "400", message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 9);
    const result = await userModel.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      plainPassword: req.body.password,
      roleId: req.body.roleId,
      role:2
    });
    if (result) {
      await nodemailer.emailSender(result);
      return res.status(200).json({ status: "200", message: "User created Successfully", response: result });
    } else {
      return res.status(400).json({ status: "400", message: 'User not created' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "500", message: "Something went wrong" });
  }
}

// LognIn of A User
const logInUser = async (req, res) => {
  try {
    let existingUser;
    if (req.body.email) {
      existingUser = await userModel.findOne({ email: req.body.email, role: 1 }).populate('roleId')
    }
    if (!existingUser && req.body.email) {
      existingUser = await userModel.findOne({ email: req.body.email, role: 2 }).populate('roleId')
    }
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);
      if (isPasswordValid) {
        const token = await accessToken(existingUser);
        return res.status(200).json({ status: "200", message: "User logged in successfully", response: existingUser, token });
      } else {
        return res.status(200).json({ status: "400", message: "Incorrect password" });
      }
    } else {
      return res.status(200).json({ status: "400", message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "500", message: "Something went wrong", error: error.message });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const result = await userModel.find({role : 2})
    return res.status(200).json({ status: "200", message: 'User data fetched successfully', response : result });
  } catch (error) {
    return res.status(200).json({ status: "500", message: 'Something went wrong' });
  }
}

const forgotPassword = async (req, res) => {

  var {
    email
  } = req.body;


  try {

    const existingUser = await userModel.findOne({
      email: email
    });
    if (!existingUser) {
      return res.status(200).json({
        status: '404',
        message: 'No User Found'
      });
    } else {

      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'della.leuschke@ethereal.email', // generated ethereal user
          pass: 'aCg8YEjxETejJM7jyh', // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Password ✔", // Subject line
        text: "http://127.0.0.1:8000/users/forgotpasswordupdate", // plain text body
        html: email, // html body
      });

      // console.log("Message sent: %s", info.messageId);

      return res.status(200).json({
        status: '200',
        message: 'Password reset link sent'
      });
    }

  } catch (error) {
    return res.status(200).json({
      status: '500',
      message: "Something went wrong"
    })
  }
}
const forgotPasswordupdate = async (req, res) => {

  var {
    email,
    password
  } = req.body;

  try {

    const existingUser = await userModel.findOne({
      email: email
    });

    // return res.status(200).json({ status: '404', message: existingUser });
    if (!existingUser) {
      return res.status(200).json({
        status: '404',
        message: 'No User Found'
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await existingUser.findOneAndUpdate(
        email, {
        $set: {
          password: hashedPassword,
        },
      }, {
        new: true
      }
      );
      const token = jwt.sign({
        email: result.email,
        password: result.password,
      },
        SECRET_KEY
      );
      res.status(200).json({
        status: "200",
        user: result,
        token: token
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: '500',
      message: "Something went wrong"
    })
  }
}
const changePassword = async (req, res) => {

  var {
    email,
    password,
    newpassword
  } = req.body;

  try {
    const existingUser = await userModel.findOne({
      email: email
    });
    if (!existingUser) {
      return res.status(200).json({
        status: '404',
        message: 'No User Found'
      });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(200).json({
        status: "400",
        message: "Invalid Credentials"
      });
    } else {
      // return res.status(200).json({ status: "400", message: "test reas" });
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      const result = await userModel.findOneAndUpdate(
        email, {
        $set: {
          password: hashedPassword,
        },
      }, {
        new: true
      }
      );
      const token = jwt.sign({
        email: result.email,
        password: result.password,
      },
        SECRET_KEY
      );
      return res.status(200).json({
        status: "200",
        user: result,
        token: token
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: '500',
      message: "Something went wrong"
    })
  }

}
const inviteTeamMember = async (req, res) => {
  const objData = {
    projectid: req.body.projectid,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }
  try {
    const existingUser = await userModel.findOne({ email: objData.email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(objData.password, 10);
      objData.password = hashedPassword
      await userModel.create(objData);
      const existingUser = await userModel.findOne({ email: objData.email });
      const userId = existingUser._id
      const result = await teamModel.create({
        userName: req.body.userName,
        userId: userId,
        projectId: objData.projectid,
        deleteStatus: true
      })
      return res.status(200).json({ status: '200', result: result, message: 'user invitation success' });
    } else {
      const userId = existingUser._id
     await teamModel.create({
        userName: req.body.userName,
        userId: userId,
        projectId: objData.projectid,
        deleteStatus: true
      })
      return res.status(200).json({ status: '200', message: 'user invitation success' });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({ status: '500', message: "Something went wrong" })
  }
}

const getUsersOnProject = async (req, res) => {
  try {
    const projectId = req.body.projectId
    const data = await teamModel.find({ projectId: projectId }).populate('userId')
    if (data <= 0) {
      return res.status(200).json({ status: "400", message: 'No record found' });
    } else {
      return res.status(200).json({ status: "200", data: data, message: 'Record found' });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json({ status: "500", message: 'Something went wrong' });
  }
}

const deleteUsers = async (req, res) => {
  try {
    const _id = req.params.id
    let result = await userModel.findByIdAndDelete({ _id: _id });
    if (result) {
      return res.status(200).json({ status: '200', message: 'User Deleted Successfully' });
    } else {
      return res.status(200).json({ status: '400', message: 'Not Found' });
    }
  } catch (err) {
    return res.status(200).json({ status: '500', message: 'Something went wrong' })
  }
}
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

module.exports = {
  getUsers, registerUser, logInUser, forgotPassword, forgotPasswordupdate, changePassword,
  inviteTeamMember, getUsersOnProject, deleteUsers
};