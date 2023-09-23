const reviewModel = require("../models/reviewModel");
const courseModel = require("../models/courseModel");
const { updateCourse } = require("../controller/courseController");
// const jwt = require('jsonwebtoken')
// const jwt_key = "THIS IS SECRET"

//need to ask where
//--------------------------------------------------------------
const jwt = require("jsonwebtoken");
const { jwt_key } = require("../controller/secrets");

module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        message: "reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({ message: "review not found" });
    }
  } catch (err) {
    // return res.json({message:'error found'})
  }
};

module.exports.top3Reviews = async function top3Reviews(req, res) {
  try {
    const reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (reviews) {
      return res.json({
        message: "reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({ message: "review not found" });
    }
  } catch (err) {
    return res.json({ message: "errors found" });
  }
};

module.exports.getCourseReviews = async function getCourseReviews(req, res) {
  try {
    //course click->corresponding jitne bhi reviews hain vo leke aane hain
    let courseid = req.params.id;
    let reviews = await reviewModel.find();
    //saare le aaye fir filter kar die
    reviews = reviews.filter((review) => review.course._id == courseid);

    return res.json({
      message: "reviews retrieved for a particular course successfully",
      data: reviews,
    });
  } catch (err) {
    return res.json({ message: "error found" });
  }
};

// module.exports.createReview=async function createReview(req,res){
//     let userId;

//     try{
//     let id=req.params.course;
//     // let coursed=await courseModel.findById(id);
//     const token=req.cookies.login;
//     //  console.log(token);

//     let payload = await jwt.verify(token, jwt_key);
//     console.log("payload token", payload);

//       if (payload) {
//         userId = payload.payload;
//         console.log(userId);

//       } else {
//         return res.json({
//           message: "user not verified",
//         });
//       }
//       const {review,rating,dat}=req.body;
//       const reviewDoc={
//         review: review,
//         rating: rating,
//        createdAt:dat,
//         user:userId,
//         course:id,

//       }
//       console.log(reviewDoc);

//       await reviewModel.create(reviewDoc);

// //humein ise baad mein review k hissab se shi karna hai taaki mujhe pta chale ki kitne number of revieews mile hain toh schema mein ek n um ber of reviews wk pllan k lie wkhna hoga
// /******************************************* */
// // planed.ratingsAverage=(planed.ratingsAverage+req.body.rating)/2;
// // await planed.save();
// ////////////////////////*************************************** */
// res.json({
//     message:'review created',
//     data:reviewDoc,
// });
//     }
//     catch(err){
//         res.json({
//             message:err.message
//         })
//     }
// }
module.exports.createReview = async function createReview(req, res) {
  let userId;

  try {
    let id = req.params.courseid;
    // let coursed=await courseModel.findById(id);
    const token = req.cookies.login;

    jwt.verify(token, jwt_key, async (err, payload) => {
      if (err) {
        return res.json({
          message: "user not verified",
        });
      }

      userId = payload.payload;

      const { review, rating, dat } = req.body;
      const reviewDoc = {
        review: review,
        rating: rating,
        createdAt: dat,
        user: userId,
        course: id,
      };

      console.log(reviewDoc);

      await reviewModel.create(reviewDoc);

      res.json({
        message: "review created",
        data: reviewDoc,
      });
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.updateReview = async function updateReview(req, res) {
  try {
    // course id
    let courseid = req.params.courseid; // Use courseid from URL parameters
    // Review id
    let reviewid = req.params.reviewid; // Use reviewid from URL parameters

    let dataToBeUpdated = req.body;
    let keys = Object.keys(dataToBeUpdated);

    let review = await reviewModel.findById(reviewid);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = dataToBeUpdated[keys[i]];
    }

    await review.save();

    return res.json({
      message: "Review updated successfully",
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    // let courseid = req.params.courseid; // Use courseid from URL parameters
    // Review id
    let id = req.params.id; // Use reviewid from URL parameters
    // let course=courseModel.findByIdAndDelete(id);
    let review = await reviewModel.findByIdAndDelete(id);
    res.json({
      message: "review deleted",
      data: review,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
