import express from 'express'
import configure from './configurations/configuration.js'
import movies from './models/movies.js'


async function main () {
  const app = express()

  await configure(app)
  app.get('/', async (req, res) => {
    const Movies = await movies.find().limit(25)
    res.render('index', { Movies })
  })
  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Server Initialized ON ${process.env.PORT}`)
    }
  })
}

main()
//You make me a function to render the first 25 movies
