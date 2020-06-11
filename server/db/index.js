const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/testdb", { useNewUrlParser: true })
  .then(() => {})
  .then(() => {
    console.log("Connection Open");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
