const express = require("express");
const courseModel = require("../models/courseModel");
const courseRouter = express.Router();
const {
  getAllCourses,
  getCourse,
  postCourse,
  updateCourse,
  top3Course,
  deleteCourse,
} = require("../controller/courseController");
const { isAuthorised } = require("../controller/authController");

courseRouter.route("/allcourses").get(getAllCourses);

//courseRouter.use(protectRoute)
courseRouter.route("/courses/:id").get(getCourse);

courseRouter.route("/top3").get(top3Course);

// courseRouter.use((isAuthorised(['admin','teacher'])))
courseRouter.route("/crudCourse").post(postCourse);

courseRouter.route("/crudCourse/:id").patch(updateCourse).delete(deleteCourse);

module.exports = courseRouter;
