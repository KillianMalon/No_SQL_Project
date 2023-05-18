import express from 'express'
import configure from './configurations/configuration.js'
import moviesRouter from './routes/movies.js'
import Movies from './models/movies.js'
import authRouter from './routes/auth.js'

async function main () {
    const app = express()
    await configure(app)


    app.use('/auth', authRouter)
    app.use('/movies', moviesRouter)

    app.get('/', (req, res) => {
      Movies.find().sort({date: 'desc'}).limit(30).then((movies) => {
        res.render("index", {Movies: movies});
      })
      .catch((error) => {
          console.log('Mongo Failed: ', error)
      })
    })

    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Server Initialized ON http://localhost:${process.env.PORT}`)
      }
    })
}

main()

// app.get('/movies', (req,res) => {
//     Movies.find().then((movies) => {
//         res.json(movies);
//     })
//     .catch((error) => {
//         console.log('Mongo Failed: ', error)
//     })
// })

// app.get('/movies/:title', (req, res) => {
//     Movies.findOne({title: req.params.title}).then((movies) => {
//         res.json(movies);
//     })
// })

// app.set('view engine', 'ejs');
// Routes
