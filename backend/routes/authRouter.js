const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

// CREATE A NEW USER : POST : /auth/signup
router.route("/signup").post(authController.signup);

// LOGIN A USER : POST : /auth/login
router.route("/login").post(authController.login);

// CHECK IF USER IS LOGGED IN : GET : /auth/isloggedin
router.route("/isloggedin").get(authController.isLoggedIn);

// LOGOUT USER : POST : /auth/logout
router.route("/logout").post(authController.logout);

// GET USER : GET : /auth/getuser
router.route("/getuser").get(authController.getUser);

// UPDATE USER : PUT : /auth/cruduser

// DELETE USER : DELETE : /auth/deleteuser

module.exports = router;
