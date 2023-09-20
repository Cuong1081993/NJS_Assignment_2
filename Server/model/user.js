const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
