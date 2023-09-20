const express = require("express");
const { body } = require("express-validator");
const authController = require("../controller/auth");
const User = require("../model/user");
const router = express.Router();

//register route
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email is exist, please choose another email !"
            );
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("userName").trim().not().isEmpty(),
    body("fullName").trim().not().isEmpty(),
    body("phoneNumber").trim().not().isEmpty(),
  ],
  authController.signUp
);

//login route
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email !")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.login
);

module.exports = router;
