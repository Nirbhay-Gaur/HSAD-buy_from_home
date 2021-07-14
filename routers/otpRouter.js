const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Otp = require("../models/otpModel.js");
const OTP_func = require("../otp/otp.js");
const { ipTracker } = require("../otp/otp.js");
const rateLimit = require("express-rate-limit");

const otpRouter = express.Router();

const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many requests for generating otp, please try again after an hour.",
});

otpRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.send("this is otp route");
  })
);

otpRouter.post(
  "/",
  ipTracker,
  otpLimiter,
  expressAsyncHandler(async (req, res) => {
    console.log(`Request from ${req.ip}`);

    try {
      const mobile = req.body.mobile;
      if (mobile && mobile.length === 10) {
        const gen_otp = OTP_func.generateOTP();
        const otp = new Otp({
          name: req.body.name,
          mobile: req.body.mobile,
          otp: gen_otp,
        });
        await otp.save();
        res.status(200).send(`OTP sent to ${mobile}`);
        console.log(`Sending ${gen_otp} to ${mobile}`);
      } else {
        res.status(400).send("Mobile number is undefined");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error: Database not connected");
    }
  })
);

module.exports = otpRouter;
