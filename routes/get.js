const router = require("express").Router();
const Movie = require('../model/mongoose_model_movie');
const User = require('../model/mongoose_model_user');
const getMovieDetails = require('../functions/getMovieDetails');
const getUserMovies = require('../functions/getUserMovies');

router.get("/movieDetails", async (req, res) => {
    const id = req.query.id
    const isMovieInDatabase = await Movie.findOne({ imdbID: id })
    if(isMovieInDatabase) {
        res.send(isMovieInDatabase)
    } else {
        const fetched = await getMovieDetails(id)
        if(!fetched.imdbID) { 
            return res.send({error: "This ID is not valid or movie is not in database"}) 
        }
        const new_movie = new Movie(fetched)
        await new_movie.save()
        res.send(new_movie)
    }
})

router.get("/movies", async (req, res) => {
    try {
        res.send(await getUserMovies(req.query.id))      
    }
    catch(err) {
        res.json({error: err});
    }
})


module.exports = router;