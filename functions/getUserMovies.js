const Movie = require('../model/mongoose_model_movie');
const User = require('../model/mongoose_model_user');

async function getUserMovies(user_id) {
    const requested_user = await User.findOne({ _id: user_id })
    if(!requested_user) {
        return "User not exist!"
    }
    const users_movies = [...requested_user.movies]
        for (let i=0; i<requested_user.movies.length; i++) {
            const movie = await Movie.findOne({ imdbID: requested_user.movies[i].imdbID})
            users_movies[i] = {
                imdbID: movie._doc.imdbID,
                title: movie._doc.title,
                year: movie._doc.year,
                poster: movie._doc.poster,
                type: movie._doc.type,
                rating: requested_user.movies[i].rating,
                shelf: requested_user.movies[i].shelf
            }
        }
    return users_movies
}

module.exports = getUserMovies