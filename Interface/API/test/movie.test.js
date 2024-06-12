import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { expect } from 'chai';
import Movies from '../models/movies.js';
import moviesService from '../services/movies.js';

let mongoServer;

describe('MoviesService', () => {
    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        const movies = [
            { title: 'Movie 1', realisator: 'Realisator 1' },
            { title: 'Movie 2', realisator: 'Realisator 2' },
            { title: 'Movie 3', realisator: 'Realisator 1' }
        ];
        await Movies.insertMany(movies);
    });

    afterEach(async () => {
        await Movies.deleteMany();
    });

    it('should return paginated movies', async () => {
        const page = 1;
        const { movies, numMovies, pages, currentPage } = await moviesService.getMovies(page);

        expect(movies).to.have.lengthOf.at.least(1);
        expect(numMovies).to.equal(3);
        expect(pages).to.equal(1);
        expect(currentPage).to.equal(page);
    });

    it('should return movies by title', async () => {
        const page = 1;
        const title = 'Movie 1';
        const { movies, numMovies, pages, currentPage } = await moviesService.searchMovies(page, title, null);

        expect(movies).to.have.lengthOf(1);
        expect(movies[0].title).to.equal(title);
        expect(numMovies).to.equal(3);
        expect(pages).to.equal(1);
        expect(currentPage).to.equal(page);
    });

    it('should return movies by realisator', async () => {
        const page = 1;
        const realisator = 'Realisator 1';
        const { movies, numMovies, pages, currentPage } = await moviesService.searchMovies(page, null, realisator);

        expect(movies).to.have.lengthOf(2);
        expect(movies[0].realisator[0]).to.equal(realisator);
        expect(numMovies).to.equal(3);
        expect(pages).to.equal(1);
        expect(currentPage).to.equal(page);
    });

    it('should return movie details', async () => {
        const title = 'Movie 1';
        const movie = await moviesService.getMovieDetails(title);

        expect(movie).to.not.be.null;
        expect(movie.title).to.equal(title);
    });

    it('should handle searching for a non-existent title', async () => {
        const page = 1;
        const title = 'Non-existent Movie';
        const { movies } = await moviesService.searchMovies(page, title, null);

        expect(movies).to.have.lengthOf(0);
    });

    it('should handle searching for a non-existent realisator', async () => {
        const page = 1;
        const realisator = 'Non-existent Realisator';
        const { movies } = await moviesService.searchMovies(page, null, realisator);

        expect(movies).to.have.lengthOf(0);
    });

    it('should handle getting details of a non-existent movie', async () => {
        const title = 'Non-existent Movie';
        const movie = await moviesService.getMovieDetails(title);

        expect(movie).to.be.null;
    });

    it('should handle invalid page number', async () => {
        const page = -1;
        try {
            await moviesService.getMovies(page);
            throw new Error('Test failed because no error was thrown for invalid page number');
        } catch (error) {
            expect(error).to.not.be.null;
            expect(error.message).to.include('BSON field \'skip\' value must be >= 0');
        }
    });
});
