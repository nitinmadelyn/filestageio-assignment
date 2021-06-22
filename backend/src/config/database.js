const mongoose = require("mongoose");

const database = module.exports;

database.connect = async function connect() {
  database.client = await mongoose.connect("mongodb://localhost:27017/todos", {
    useUnifiedTopology: true,
  });
};
