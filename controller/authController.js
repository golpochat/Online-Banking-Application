// // loading model
// const User = require("../model/User");
// // loading json web token
// const jwt = require("jsonwebtoken");
// // const expressJwt = require("express-jwt");
// const _ = require("lodash");
// // loading sendgride mail
// const sendgridMail = require("@sendgrid/mail");
// const { json } = require("body-parser");
// sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

// exports.signup = (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error:
//           "The email has already been taken, please try with different one",
//       });
//     }
//     const token = jwt.sign(
//       {
//         email,
//         password,
//       },
//       process.env.JWT_ACCOUNT_ACTIVATION,
//       { expiresIn: "1d" }
//     );

//     const emailData = {
//       from: process.env.EMAIL_FROM,
//       to: email,
//       subject: "Account activation link",
//       html: `
//       <h1 style="text-align:center;">Account activation</h1>
//       <h3 style="color:red;">Please note, link will be expired within 24 hrs.</h3>
//       <hr />
//       <p>Please click on the link to activate your account.</p>
//       <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
//       <hr />
//       <p>The email may contain some senstive information</p>
//         <p>${process.env.CLIENT_URL}</p>
//       `,
//     };
//     sendgridMail
//       .send(emailData)
//       .then((sent) => {
//         // console.log("SIGNUP EMAIL SENT", sent);
//         return res.json({
//           message: `Email has been sent to ${email}. Follow the instruction to activate your account.`,
//         });
//       })
//       .catch((err) => {
//         // console.log(error.response.body);
//         // console.log(error.response.body.errors[0].message);
//         return res.json({
//           message: err.message,
//         });
//       });
//   });
// };

// // for activating user account
// exports.activation = (req, res) => {
//   const { token } = req.body;
//   if (token) {
//     jwt.verify(
//       token,
//       process.env.JWT_ACCOUNT_ACTIVATION,
//       function (err, decoded) {
//         if (err) {
//           console.log("JWT VERIFY IN ACTIVATION ERROR", err);
//           // status code 401 is unauthorized access
//           return res.status(401).json({
//             error: "You link has been expired, please sign-up again.",
//           });
//         }
//         const { email, password } = jwt.decode(token);
//         const user = new User({ email, password });
//         user.save((err, user) => {
//           if (err) {
//             console.log("SAVE USER IN ACTIVATION ERROR", err);
//             return res.status(401).json({
//               error: "User could not be created, please try again later.",
//             });
//           }
//           return res.json({
//             message: "User created successfully. You may sign-in now.",
//           });
//         });
//       }
//     );
//   } else {
//     return res.json({
//       message: "Something went wrong, please try again later.",
//     });
//   }
// };

// // method for signin process
// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   // check if the user is already exist
//   User.findOne({ email }).exec((err, user) => {
//     if (err || !user) {
//       return res.status(404).json({
//         error: "Seems like you are not registered yet, please signup now.",
//       });
//     }
//     // authentication
//     if (!user.authenticate(password)) {
//       return res.status(400).json({
//         error:
//           "The combination of username and password were incorrect, try again.",
//       });
//     }
//     console.log(user.status);
//     if (user.status === 0)
//       return res.status(400).json({
//         error:
//           "Your account has been suspended, please contact to admin for more information.",
//       });
//     // if the user is authenticated
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     const { _id, email, role } = user;
//     return res.json({
//       token,
//       user: { _id, email, role },
//       //   user: user,
//     });
//   });
// };

// exports.requireLogin = expressJwt({
//   secret: process.env.JWT_SECRET, //req.user._id
// });

// // admin routing
// exports.adminMiddleware = (req, res, next) => {
//   User.findById({ _id: req.user._id }).exec((err, user) => {
//     if (err || !user) {
//       return res.status(404).json({
//         error: "User not found.",
//       });
//     }
//     if (user.role !== "admin") {
//       return res.status(422).json({
//         error: "You are not authorized to access this location.",
//       });
//     }

//     req.profile = user;
//     next();
//   });
// };

// exports.forgotPassword = (req, res) => {
//   const { email } = req.body;
//   User.findOne({ email }, (err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "User with that email does not exist.",
//       });
//     }
//     const token = jwt.sign(
//       {
//         _id: user._id,
//       },
//       process.env.JWT_RESET_PASSWORD,
//       { expiresIn: "10m" }
//     );

//     const emailData = {
//       from: process.env.EMAIL_FROM,
//       to: email,
//       subject: "Request to reset password",
//       html: `
//       <h1 style="text-align:center;">Password reset</h1>
//       <h3 style="color:red;">Please note, link will be expired within 10 min.</h3>
//       <hr />
//       <p>Please click on the link to reset your password.</p>
//       <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
//       <hr />
//       <p>The email may contain some senstive information</p>
//         <p>${process.env.CLIENT_URL}</p>
//       `,
//     };

//     return user.updateOne({ resetPasswordLink: token }, (err, success) => {
//       if (err) {
//         console.log("RESET PASSWORD LINK ERROR", err);
//         return res.status(400).json({
//           error: "Database connection error on user password forgot request.",
//         });
//       }

//       sendgridMail
//         .send(emailData)
//         .then((sent) => {
//           // console.log("SIGNUP EMAIL SENT", sent);
//           return res.status(200).json({
//             message: `An email has been sent to ${email}. Follow the instruction to reset your password.`,
//           });
//         })
//         .catch((err) => {
//           // console.log(error.response.body);
//           // console.log(error.response.body.errors[0].message);
//           return res.json({
//             message: err.message,
//           });
//         });
//     });
//   });
// };
// exports.resetPassword = (req, res) => {
//   const { resetPasswordLink, newPassword } = req.body;

//   if (resetPasswordLink) {
//     jwt.verify(
//       resetPasswordLink,
//       process.env.JWT_RESET_PASSWORD,
//       function (err, decoded) {
//         if (err) {
//           console.log("JWT VERIFY IN RESETTING PASSWORD ERROR", err);
//           // status code 401 is unauthorized access
//           return res.status(401).json({
//             error: "Your link has been expired, please try again.",
//           });
//         }
//         User.findOne({ resetPasswordLink }, (err, user) => {
//           if (err || !user) {
//             return res.status(401).json({
//               error: "Something went wrong, try again later.",
//             });
//           }
//           const updatedField = {
//             password: newPassword,
//             resetPasswordLink: "",
//           };
//           user = _.extend(user, updatedField);
//           user.save((err, result) => {
//             if (err) {
//               return res.status(400).json({
//                 error: "Error resetting user password.",
//               });
//             }
//             res.json({
//               message: "Password resetting successfull, you may login now",
//             });
//           });
//         });
//       }
//     );
//   }
// };

// exports.signout = (req, res) => {
//   res.clearCookie("t");
//   return res.json({ message: "Signout success!" });
// };
