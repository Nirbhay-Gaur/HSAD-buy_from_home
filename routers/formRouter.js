const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Form = require("../models/formModel.js");
const { checkOTP } = require("../otp/otp.js");
const FinalForm = require("../models/finalFormModel.js");
const { upload } = require("../helper/helper.js");
const { unlink } = require("fs");

const formRouter = express.Router();

formRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.send("this is form router");
  })
);

formRouter.post(
  "/",
  checkOTP,
  expressAsyncHandler(async (req, res) => {
    const formData = new Form({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      otp: req.body.otp,
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,
      product: req.body.product,
    });
    await formData.save((err) => {
      if (err) {
        res.status(500).send("Failed to Submit Data. Please try again!");
        console.log(err.message);
      } else {
        res.status(200).send(`Your unique ID is ${formData._id}`);
      }
    });
  })
);

formRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const data = await Form.findById(req.params.id);
      if (data) {
        res.send({
          id: data._id,
          name: data.name,
          mobile: data.mobile,
          email: data.email,
          product: data.product,
        });
      } else {
        res.status(404).send("User Data Not Found");
      }
    } catch (error) {
      res
        .status(500)
        .send(
          "Internal Server Error: Verify if the unique id is correct or try again later"
        );
    }
  })
);

formRouter.post(
  "/forgetId",
  expressAsyncHandler(async (req, res) => {
    try {
      const mobile = req.body.mobile;
      const product = req.body.product;
      await Form.findOne(
        { mobile: mobile, product: product },
        (err, result) => {
          if (err || result === null) {
            res
              .status(404)
              .send(
                "Invalid input: We could not find the data based on the entered mobile/product details"
              );
          } else {
            res.send({ id: result._id });
          }
        }
      );
    } catch (error) {
      res.status(500).send("Somthing went wrong. Try again");
    }
  })
);

formRouter.post(
  "/:id",
  upload.single("i_upload"),
  expressAsyncHandler(async (req, res) => {
    try {
      const data = new FinalForm({
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        product: req.body.product,
        productDropDown: req.body.productDropDown,
        modelDropDown: req.body.modelDropDown,
        dealer_name: req.body.dealer_name,
        i_date: req.body.i_date,
        i_num: req.body.i_num,
        i_upload: {
          fileName: req.file.originalname,
          filePath: req.file.path,
          fileType: req.file.mimetype,
          fileSize: req.file.size,
        },
        mod_mobile: req.body.mod_mobile,
        mod_product: req.body.mod_product,
      });
      await data.save((err) => {
        if (err) {
          res
            .status(409)
            .send("Error while saving data/ Id already registered");
          unlink(req.file.path, (err) => {
            if (err) throw err;
            console.log(`${req.file.path} was deleted succesfully`);
          });
        } else {
          res.status(200).send(`Submitted`);
        }
      });
    } catch (error) {
      res.status(500).send("Internal Server Error: Try Again Later");
    }
  })
);

module.exports = formRouter;
