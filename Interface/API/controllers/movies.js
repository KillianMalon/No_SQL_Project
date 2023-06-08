import Movies from "../models/movies.js"

const resPerPage = 25; // results per page

// This is the controller for the movies route
const moviesView = async (req, res) => {
    // This is the page number
    const page = req.params.page || 1;
    const numMovies = await Movies.count();
    
    Movies.find().skip((resPerPage * page) - resPerPage).limit(resPerPage).then((movies) => {
        res.render("movies", {
            Movies: movies,
            currentPage: page,
            pages: Math.ceil(numMovies / resPerPage),
            numMovies: numMovies
        });
    })
    .catch((error) => {
        console.log('Mongo Failed: ', error)
    })
}

export const moviesSearchView = async (req, res) => {
    // This is the page number
    const page = req.params.page || 1;
    const numMovies = await Movies.count();
    
    Movies.find({title: { $in: [ req.params,  ] }}).skip((resPerPage * page) - resPerPage).limit(resPerPage).then((movies) => {
        res.render("search", {
            Movies: movies,
            currentPage: page,
            pages: Math.ceil(numMovies / resPerPage),
            numMovies: numMovies
        });
    })
    .catch((error) => {
        console.log('Mongo Failed: ', error)
    })
}


export const movieDetailsView = (req, res) => {
    Movies.findOne({title: req.params.title}).then((movie) => {
        res.render("details", {Movie: movie});
    })
    .catch((error) => {
        console.log('Mongo Failed: ', error)
    })
    
}




export default moviesView