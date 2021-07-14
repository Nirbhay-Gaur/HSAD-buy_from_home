const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    require: true,
  },
  filePath: {
    type: String,
    require: true,
  },
  fileType: {
    type: String,
    require: true,
  },
  fileSize: {
    type: String,
    require: true,
  },
});

const FinalFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    mobile: { type: Number, required: true },
    product: { type: String, required: true },
    productDropDown: { type: String, required: true },
    modelDropDown: { type: String, required: true },
    dealer_name: { type: String, required: true },
    i_date: { type: String, required: true },
    i_num: { type: String, required: true },
    i_upload: fileSchema,
    mod_mobile: { type: String },
    mod_product: { type: String },
  },
  { timestamps: true }
);

const FinalForm = mongoose.model("FinalForm", FinalFormSchema);

module.exports = FinalForm;
