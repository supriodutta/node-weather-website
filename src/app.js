// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })
// app.get(path.join(publicDirectoryPath,'/help.html'), (req, res) => {
//     res.send([{
//         name: 'Suprio',
//         age: 29
//     },{
//         name: 'Andrew'
//     }])
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>This is About page!</h1>')
// })
// ~~~~~~~~~~~~~~~~~~~~ Code ~~~~~~~~~~~~~~~~~~~~ //

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suprio Dutta'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me:',
        name: 'Suprio Dutta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page!',
        message: 'This is help page.',
        name: 'Suprio Dutta'
    })
})

// geocode(process.argv[2], (error, {latitude, longitude, location}) => {
//     if (process.argv[2]) {
//         if (error) {
//             return console.log(error)
//         }
//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return console.log(error)
//             }
//             console.log(location)
//             console.log(forecastData)
//         })
//     } else {
//         console.log('Please provide valid location!')
//     }

// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        productss: []
    })
})

// app.com - demo domain
// app.com/help
// app.com/about


app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found!',
        name: 'Suprio Dutta',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page not found!',
        name: 'Suprio Dutta',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})