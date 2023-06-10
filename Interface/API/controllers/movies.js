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
    
    if(req.body['input-recherche-titre'] != null && req.body['input-recherche-realisateur'] == null){
        Movies.find({title: { $regex:  req.body['input-recherche-titre'], $options: 'i' }}).skip((resPerPage * page) - resPerPage).limit(resPerPage).then((movies) => {
            res.render("search", {
                Movies: movies,
                currentPage: page,
                pages: Math.ceil(numMovies / resPerPage),
                numMovies: numMovies,
                bonjour: req.body['input-recherche-titre']
            });
        })
        .catch((error) => {
            console.log('Mongo Failed: ', error)
        })
    }else if(req.body['input-recherche-realisateur'] !== null && req.body['input-recherche-titre'] == null){
        Movies.find({realisator: { $regex:  req.body['input-recherche-realisateur'], $options: 'i'  }}).skip((resPerPage * page) - resPerPage).limit(resPerPage).then((movies) => {
            res.render("search", {
                Movies: movies,
                currentPage: page,
                pages: Math.ceil(numMovies / resPerPage),
                numMovies: numMovies,
                bonjour: req.body['input-recherche-realisateur']
            });
        })
        .catch((error) => {
            console.log('Mongo Failed: ', error)
        })
    }else if(req.body['input-recherche-realisateur'] !== null && req.body['input-recherche-titre'] !== null){
        console.log('oui')
        Movies.find({realisator: { $regex:  req.body['input-recherche-realisateur'], $options: 'i'  }, title: { $regex:  req.body['input-recherche-titre'], $options: 'i' }}).skip((resPerPage * page) - resPerPage).limit(resPerPage).then((movies) => {
            res.render("search", {
                Movies: movies,
                currentPage: page,
                pages: Math.ceil(numMovies / resPerPage),
                numMovies: numMovies,
                numMovies: numMovies,
                bonjour: req.body['input-recherche-realisateur']
            });
        })
        .catch((error) => {
            console.log('Mongo Failed: ', error)
        })
    }else{
        Movies.find().skip((resPerPage * page) - resPerPage).limit(resPerPage).then((movies) => {
            res.render("search", {
                Movies: movies,
                currentPage: page,
                pages: Math.ceil(numMovies / resPerPage),
                numMovies: numMovies,
                bonjour: req.body['input-recherche-realisateur']
            });
        })
        .catch((error) => {
            console.log('Mongo Failed: ', error)
        })
    }
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