import express from 'express'
const router = express.Router()
import detailsMovieView from '../controllers/detailsMovie.js'

// This is the route for the movies route
// It is a GET request to the /movies path

router.get('details/:title', detailsMovieView)

export default router