const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//for coustomizing views directory path so that we can use any other name intead of folder name as 'views'
const publicDirectoryPath = path.join(__dirname,'../public/')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialPaths)

//To customize server to serve different directory
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Varun'
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Varun'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        desc:"This is a help section.",
        name:'Varun'
    })
})
// app.get('/help',(req, res)=>{
//     res.send([{
//         name:'Varun',
//         age:29
//     },
//     {
//         skills:'Node.js',
//         experience : '7 years'
//     }])
// })
// app.get('/about',(req, res)=>{
//     res.send('This is about page!')
// })
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address.'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast: data,
                location: location,
                address:req.query.address
            })    
      })
    })
})
app.get('/help/*',(req, res)=>{
    res.render('error',{
        title:'404',
        message:'Help article not fund',
        name:'Varun'
    })
})
app.get('*',(req, res)=>{
    res.render('error',{
        title:'404',
        message:'Page not found',
        name:'Varun'
    })
})
app.listen(port,()=>{
    console.log('Express server started successfully.')
})