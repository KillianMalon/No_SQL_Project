import express from 'express'

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
  app.set('view engine', 'ejs')
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
 
  console.log('Express Initialized.')
}