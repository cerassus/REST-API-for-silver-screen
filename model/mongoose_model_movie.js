const mongoose = require('mongoose');

const database_schema = new mongoose.Schema({
    imdbID: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      // required: true,
    },
    year: {
      // required: true,
      type: String,
    },
    released: {
      // required: true,
      type: String,
    },
    country: {
      // required: true,
      type: String,
    },
    runtime: {
      // required: true,
      type: String,
    },
    actors: {
      // required: true,
      type: String,
    },
    director: {
      // required: true,
      type: String,
    },
    genre: {
      // required: true,
      type: String,
    },
    type: {
      // required: true,
      type: String,
    },
    imdbRating: {
      // required: true,
      type: String,
    },
    poster: {
      // required: true,
      type: String,
    },
    plot: {
      // required: true,
      type: String,
    },
  });
  
const Movie = mongoose.model("movies", database_schema);

module.exports = Movie;
