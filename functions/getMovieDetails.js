const fetch = require("node-fetch");

async function getMovieDetails(id) {
    if(!id) return {}
    try {
        const apiShot = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=2c51327`);
        const jason = await apiShot.json();
        console.log('fetching for movie details = ' + id)
        if(jason.error) return {}
        return {
            imdbID: jason.imdbID,
            title: jason.Title,
            year: jason.Year,
            released: jason.Released,
            country: jason.Country,
            runtime: jason.Runtime,
            actors: jason.Actors,
            director: jason.Director,
            genre: jason.Genre,
            type: jason.Type,
            imdbRating: jason.imdbRating,
            poster: jason.Poster,
            plot: jason.Plot,
        }
    }
    catch(error) {
        return {}
    }
}

module.exports = getMovieDetails