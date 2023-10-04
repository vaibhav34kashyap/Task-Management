const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      userName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
          type : String
        }
      
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("user", userSchema);