const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const ArticleSchema = new Schema(
  {
    headLine: {
      type: String,
      required: true,
    },
    subHead: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      lowercase: true,
    },
    category: {
      name: {
        type: String,
        required: true,
        lowercase: true,
      },
      img: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
    author: {
      name: {
        type: String,
        required: true,
        lowercase: true,
      },
      img: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
    cover: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);