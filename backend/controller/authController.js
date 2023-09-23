const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { jwt_key } = require("../controller/secrets");

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.roles) == true) {
      next();
    } else {
      res.status(401).json({
        message: "You are unauthorized for this action",
      });
    }
  };
};

module.exports.getUser = async function getUser(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, jwt_key, async (err, payload) => {
    if (err) {
      return res.json({
        message: "user not verified",
      });
    }

    let userId = payload.payload;
    let user = await userModel.findById(userId);
    if (user) {
      return res.json(user);
    } else {
      return res.json({
        message: "user not found",
      });
    }
  });
};

module.exports.getAllUser = async function getAllUser(req, res) {
  let allUsers = await userModel.find();
  if (allUsers) {
    res.json({
      message: " users retrieved",
      data: allUsers,
    });
  } else {
    //let allUsers=await userModel.findOne({name:'saubhagya'});
    res.send("user id recieved");
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  // let dataToBeDeleted=req.body;
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    res.json({
      message: "data has been deleted",
      data: user,
    });
  } catch (err) {
    res.json({
      meassge: err.message,
    });
  }
};

// module.exports.newuser = async function newuser(req, res) {
//     const user = await userModel.findOne({ email: req.body.email })
//     if (user) {
//         return res.status(400).json({
//             msg: 'User Already exists'
//         })
//     }

//     try {
//         const newUser = await userModel.create(req.body)
//         // const privateKey = process.env.JWT_SECRET;
//         const privateKey = 'THIS IS SECRET';
//         const payload = {
//             userId: newUser.id,
//             role: user.role
//         }
//         const token = jwt.sign(payload, privateKey);
//         res.cookie(
//             'token',
//             token,
//             {
//                 httpOnly: true,
//                 secure: true
//             })
//         return res.status(200).json(newUser)
//     } catch (err) {
//         return res.status(500).json({
//             msg: `${err}`
//         })
//     }
// }
module.exports.signup = async function SignUp(req, res) {
  try {
    let dataobj = req.body;
    let user = await userModel.create(dataobj);
    //   sendMail("signup", user);
    if (user) {
      //console.log('backend',user);
      return res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signing up",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//login user
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;

    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      console.log(user);
      //findone functions aur baaki aur sab object lete hain
      if (user) {
        //bcrypt-compare will be used later for increasing security
        if (user.password == data.password) {
          let uid = user["_id"]; //uid
          console.log(uid);
          let token = jwt.sign({ payload: uid }, jwt_key); //iss line se hmara signature bn jaaye uid hum laak aa chuke hain aur header ya algoithm predefined hai
          // //cookie ka istemal krenge response bhejne se pehle response object k andar ek cookie bna denge
          console.log("this is token" + token);
          res.cookie("token", token, { httpOnly: true });
          return res.json({
            message: "User has logged in",
            userDetails: data,
          });
        }
      } else {
        return res.json({
          message: "user not available",
        });
      }
    } else {
      return res.json({
        message: "empty field found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// module.exports.login = async function login(req, res) {
//     const user = await userModel.findOne({ email: req.body.email })
//     if (!user) {
//         res.status(400).json({
//             msg: "User does not exist"
//         })
//     }
//     try {
//         bcrypt.compare(req.body.password, user.password, (err, result) => {
//             if (err) {
//                 res.status(500).json({ msg: err })
//             }

//             if (result) {
//                 // const privateKey = process.env.JWT_SECRET;
//                 const privateKey = 'THIS IS SECRET';
//                 const payload = {
//                     userId: user.id,
//                     role: user.role
//                 }
//                 const token = jwt.sign(payload, privateKey);
//                 res.cookie(
//                     'token',
//                     token,
//                     {
//                         httpOnly: true,
//                         secure: true
//                     })
//                 res.json({msg: "Login Successful"})
//             } else {
//                 res.status(400).json({ msg: "Bad credentials" })
//             }
//         })
//     } catch (err) {
//         res.status(500).json({
//             msg: "Something went wrong"
//         })
//     }
// }
// middleware to check if user is logged in

module.exports.isLoggedIn = async function (req, res) {
  // return async (req, res) => {
  //   console.log("djfj");
  //   const token = req.cookies.token;
  //   if (token) {
  //     res.json({ isLoggedIn: true });
  //   } else {
  //     res.json({ isLoggedIn: false });
  //   }
  // };

  const token = req.cookies.token;
  if (token) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
};

module.exports.logout = async function (req, res) {
  return async (req, res) => {
    const token = req.cookies.token;
    if (token) {
      res.clearCookie("token");
      res.json({ msg: "Logout Successful" });
    } else {
      res.status(400).json({ isLoggedIn: false });
    }
  };
};
