import mongoose from "mongoose";

/**
 * Mongo configuration.
 * @param {express.Application} app
 * @returns {Promise<void>}
 * @description This is the configuration for the mongoose app
 * It is a function that takes an express app as a parameter
 * It returns a promise that resolves when the configuration is complete
 * It connects to the database
 * It logs a message to the console
 */
export async function configure (app) {
  return mongoose
    .connect(process.env.DATABASE_URL, {
      // These options are to avoid deprecation warnings
      // They are not required
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Mongo Initialized')
    })
    .catch((error) => {
      console.log('Mongo Failed: ', error)
    })
}