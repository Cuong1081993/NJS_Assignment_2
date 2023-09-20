const User = require("../model/user");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    const error = new Error("Validation failed");
    error.data = errs.array();
    throw error;
  }
  console.log(errs);

  //destructuring
  const { userName, password, fullName, phoneNumber, email } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = new User({
      userName: userName,
      password: hashedPassword,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      isAdmin: req.body.isAdmin ? true : false,
    });
    const result = await user.save();
    res.status(200).json({
      message: "Create User Successful",
      userId: result._id.toString(),
      userName: userName,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const err = new Error(`User with ${email} does not match`);
      err.code = 401;
      throw err;
    }
    const isEqual = bcryptjs.compare(password, user.password);
    if (!isEqual) {
      const err = new Error("Password does not match !");
      err.code = 401;
      throw err;
    }
    const token = jsonwebtoken.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "helloWorld",
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json({
      token: token,
      userName: user.userName,
      userId: user._id.toString(),
      expiryDate: new Date() * 7200000,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    next(err);
  }
};
