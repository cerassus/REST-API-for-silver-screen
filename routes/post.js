const router = require("express").Router();
const tokenVerify = require("../middleware/tokenVerify");
const User = require('../model/mongoose_model_user');
const Movie = require('../model/mongoose_model_movie');
const getMovieDetails = require('../functions/getMovieDetails');
const getUserMovies = require("../functions/getUserMovies");

router.post("/addMovie", tokenVerify, async (req, res) => {

    const movie_ID = req.body.movie.imdbID
    const user = await User.findOne({ 
        _id: req.body._id, 
        "movies.imdbID": movie_ID,
    })
    const result = await User.findOneAndUpdate(
        user 
            ? {
                _id: req.body._id, 
                "movies.imdbID": movie_ID,
                }
            : { _id: req.body._id },
        user 
            ? { $set: { "movies.$": { 
                imdbID: req.body.movie.imdbID, 
                rating: req.body.movie.rating, 
                shelf: req.body.movie.shelf, 
            } } }
            : { $push: { movies: { 
                imdbID: req.body.movie.imdbID, 
                rating: req.body.movie.rating, 
                shelf: req.body.movie.shelf,
            } } },
        {
            new: true,
            useFindAndModify: false
        }
    )
    // is requested movie in our global movie database?

    const movieExist = await Movie.findOne({ imdbID: movie_ID })
    if(!movieExist) {
        if(req.body.movie.hasOwnProperty('genre')) {
            const movie = new Movie(req.body.movie)
            await movie.save()
        } else {
            const movie_with_details = await getMovieDetails(movie_ID)
            const new_movie = new Movie(movie_with_details)
            await new_movie.save()
        }
    }
    res.send(await getUserMovies(req.body._id)) 
})

router.post("/removeMovie", tokenVerify, async (req, res) => {
    const movie_ID = req.body.movie.imdbID
    const user = await User.findOne({ 
        _id: req.body._id, 
        "movies.imdbID": movie_ID,
    })
    const result = await User.findOneAndUpdate(
        {
            _id: req.body._id, 
            "movies.imdbID": movie_ID,
        },
        {
            $pull: { "movies": { imdbID: movie_ID  } }
        },
        {
            new: true,
            useFindAndModify: false
        }
    )
    res.send(await getUserMovies(req.body._id)) 
})



module.exports = router;