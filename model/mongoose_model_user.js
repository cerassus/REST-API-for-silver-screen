const mongoose = require('mongoose');

const database_schema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    movies: {
      type: Array,
      required: true,
    }
  });
  
const User = mongoose.model("users", database_schema);

module.exports = User;
