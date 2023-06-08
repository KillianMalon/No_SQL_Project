import express from 'express'
import moviesRoutes from '../routes/movies.js'
import authRoutes from '../routes/auth.js'
import movies from '../models/movies.js'
/**
 * Express configuration.
 * @param {express.Application} app
 * @returns {Promise<void>}
 * @description This is the configuration for the express app
 * It is a function that takes an express app as a parameter
 * It returns a promise that resolves when the configuration is complete
 * It sets the view engine to ejs
 * It uses the express.json() middleware
 * It uses the express.urlencoded() middleware
 * It logs a message to the console
 */


export async function configure (app) {
  // app.use(express.static('public'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.set('view engine', 'ejs')

  app.use('/movies', moviesRoutes)
  app.use('/auth', authRoutes)
  //Récupère les 25 films en base les plus récents grâce à leur date de sortie
  


  app.get('/', async (req, res) => {
    const Movies = await movies.find().sort({date: -1}).limit(25)
    res.render('index', { Movies })
  })
}