const Otp = require("../models/otpModel.js");
const { getClientIp } = require("@supercharge/request-ip");

// OTP generator
module.exports.generateOTP = function () {
  const otp = ("" + Math.random()).substring(2, 8);
  return otp;
};

//OTP verification
module.exports.checkOTP = async function (req, res, next) {
  try {
    req.requestedAt = new Date().getTime();
    const client_otp = Number(req.body.otp);
    const server_otp = await Otp.find({ mobile: req.body.mobile })
      .sort({ _id: -1 })
      .limit(1);
    const createdAt = server_otp[0].createdAt.getTime();
    if (client_otp === server_otp[0].otp) {
      if (req.requestedAt - createdAt <= 120000) {
        next();
      } else {
        res.status(401).send("OTP expired! Generate new OTP");
      }
      await Otp.deleteOne({ otp: client_otp });
    } else {
      res.status(404).send("Invalid OTP! Enter valid generated OTP");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error! Please generate OTP again.");
  }
};

// IP Address Tracker
module.exports.ipTracker = async function (req, res, next) {
  req.ip = getClientIp(req);
  next();
};
