const path = require('path')
const express = require('express')
const hbs = require('hbs')  //needed to work with partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]


const app = express()

//define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Home',
        name: 'Lori'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Lori'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Lori'
    })
})

app.get('/weather', (req, res) => {
   // res.send({location: 'abilene', forecast: 'night'})
   if (!req.query.address) {
       return res.send({
           errormsg:'Address must be provided'
       })
    }

    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                errormsg: error
            })
        }
        
        // console.log('Data: ', data)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    errormsg: error
                })
            }
            
            res.send({location, forecastData})
            // res.render('weather',{
            //     title: 'Weather',
            //     name: 'Lori',
            //     city: location,
            //     forecast: forecastData
            // })
        })
    })

  
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "You must provide a search term."
//         })
//     }

//     console.log(req.query)
//     res.send({
//         products: []
//     })

// })

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: 'Error - 404',
        name: 'Lori',
        errormsg: 'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: 'Error - 404',
        name: 'Lori',
        errormsg: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
