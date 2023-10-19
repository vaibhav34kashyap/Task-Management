const mongoose = require("mongoose");

const users = mongoose.model(
  'User', mongoose.Schema({
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    plainPassword: {
      type: String,
      required: true
    },
    roleId: {
      type: mongoose.Types.ObjectId,
      ref: 'roles'
    },
    role :{
      type : Number
    }
  },
    {
      timestamps: true,
    }
  )
);
module.exports = users;