import Movies from "../models/movies.js"

const detailsMovieView = (req, res) => {
    Movies.findOne({title: req.params.title}).then((movies) => {
        res.render("details", {Movies: movies});
    })
    .catch((error) => {
        console.log('Mongo Failed: ', error)
    })
}

export default detailsMovieView