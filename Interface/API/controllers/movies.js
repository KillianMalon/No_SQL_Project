import moviesService from "../services/movies.js";

const resPerPage = 25;

const moviesView = async (req, res) => {
    const page = req.params.page || 1;
    try {
        const { movies, numMovies, pages, currentPage } = await moviesService.getMovies(page);
        res.render("movies", { Movies: movies, currentPage, pages, numMovies });
    } catch (error) {
        console.log('Mongo Failed: ', error);
    }
};

export const moviesSearchView = async (req, res) => {
    const page = req.params.page || 1;
    const title = req.body['input-recherche-titre'];
    const realisator = req.body['input-recherche-realisateur'];

    try {
        const { movies, numMovies, pages, currentPage } = await moviesService.searchMovies(page, title, realisator);
        res.render("search", { Movies: movies, currentPage, pages, numMovies, bonjour: title || realisator });
    } catch (error) {
        console.log('Mongo Failed: ', error);
    }
};

export const movieDetailsView = async (req, res) => {
    try {
        const movie = await moviesService.getMovieDetails(req.params.title);
        res.render("details", { Movie: movie });
    } catch (error) {
        console.log('Mongo Failed: ', error);
    }
};

export default moviesView;
