const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true,
    },
    modelDes: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addproduct",
    },
    status: {
      type: Boolean,
      default: true,
    },
    warranty:{
      type:String,
      required: true,

    },
  },
  { timestamps: true }
);

const Model = mongoose.model("Model", modelSchema);

module.exports = Model;
