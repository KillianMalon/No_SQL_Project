import * as express from './express.js'
import * as mongoose from './mongoose.js'

/// This is the configuration for the app
/// It is a function that takes an express app as a parameter
/// It returns a promise that resolves when the configuration is complete
export async function configure (app) {
  /// This is the configuration for the express app
  await express.configure(app)
  // This is the configuration for the mongoose app
  await mongoose.configure(app)
}

export default configure