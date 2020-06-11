//schema for Test

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  author: { type: String, required: true },
  allowedUsers: { type: Array },
});

module.exports = mongoose.model("tests", TestSchema);
