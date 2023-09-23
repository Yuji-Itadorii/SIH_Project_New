const express=require("express");
const reviewModel=require("../models/reviewModel");
const reviewRouter=express.Router();
const {getAllReviews,top3Reviews,getCourseReviews,createReview,updateReview,deleteReview}=require("../controller/reviewController");

const {isAuthorised}=require("../controller/authController");
// const reviewRouter = require("./reviewRouter");

reviewRouter.route('/allReviews')
.get(getAllReviews)

//reviewRouter.use(protectRoute)
reviewRouter.route('/reviews/:id')
.get(getCourseReviews)

reviewRouter.route('/top3reviews')
.get(top3Reviews)



reviewRouter
.route('/crudReview/:courseid')
.post(createReview)


reviewRouter
.route('/crudReview/:courseid/:reviewid') 
.patch(updateReview)

reviewRouter
.route('/crudReview/:id')
.delete(deleteReview)

module.exports=reviewRouter