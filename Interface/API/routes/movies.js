import express from 'express'
const router = express.Router()
import moviesView, { movieDetailsView, moviesSearchView } from '../controllers/movies.js'

// This is the route for the movies route
// It is a GET request to the /movies path
router.get('/', moviesView)
router.get('/page/:page', moviesView)
router.get('/details/:title', movieDetailsView)
router.get('/search', moviesSearchView)

export default router