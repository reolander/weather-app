const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

const port = process.env.PORT || 3000

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirPath = path.join(__dirname, '../public')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(publicDirPath))

// These routes are not necessary as we'll be serving static HTML pages.
//-------------------------------------
// app.get('/', (req, res) => {
//   res.send(index.html)
// })

// app.get('/help', (req, res) => {
//   res.send({
//     name: 'Naruto',
//     age: 37
//   })
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>About page</h1>')
// })
//----------------------------------------

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Naruto Uzumaki'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Naruto Uzumaki'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Naruto Uzumaki',
    helpText: 'This is a help page'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      Error: 'No search term provided'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if(error) {
      return res.send({ error })
    } 
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      } 

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })

  // res.send([{
  //   forecast: 'It is snowing',
  //   location: 'Philadelphia',
  //   address: req.query.search
  // }])
})

// Send only when query string has 'search' term.
// app.get('/products', (req, res) => {
//   console.log(req)
//   if(!req.query.search) {
//     return res.send({
//       Error: 'No search term provided'})
//   }
//   res.send({
//     products: []
//   })
// })

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error Page',
    name: 'Naruto, Uzumaki',
    errorMessage: 'Help page not found'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error Page',
    name: 'Naruto, Uzumaki',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is running...')
})