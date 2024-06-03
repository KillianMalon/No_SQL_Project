import Movies from "../models/movies.js";

const resPerPage = 25;

class MoviesService {
    constructor() {
        if (MoviesService.instance == null) {
            MoviesService.instance = this;
        }
        return MoviesService.instance;
    }

    async getMovies(page) {
        const numMovies = await Movies.count();
        const movies = await Movies.find().skip((resPerPage * page) - resPerPage).limit(resPerPage);
        return {
            movies,
            numMovies,
            pages: Math.ceil(numMovies / resPerPage),
            currentPage: page
        };
    }

    async searchMovies(page, title, realisator) {
        const numMovies = await Movies.count();
        let query = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        if (realisator) {
            query.realisator = { $regex: realisator, $options: 'i' };
        }

        const movies = await Movies.find(query).skip((resPerPage * page) - resPerPage).limit(resPerPage);
        return {
            movies,
            numMovies,
            pages: Math.ceil(numMovies / resPerPage),
            currentPage: page
        };
    }

    async getMovieDetails(title) {
        const movie = await Movies.findOne({ title });
        return movie;
    }
}

const instance = new MoviesService();
Object.freeze(instance);

export default instance;
