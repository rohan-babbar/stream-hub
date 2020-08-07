const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const movie = require('./utils/movie')

//sharing on localhost 3000.
const port = process.env.PORT||3000;

const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const  viewsPath = path.join(__dirname,'../templates/views')
const  partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs') //key, value ->name of the module
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{ //rout handler for root page
    res.render('index',{ //passing an object
        title : 'Streams',
        name : 'Rohan Babbar'
    })

})

 app.get('/movie',(req,res)=> {
     // res.render('movie',{
     //     title : 'Movie',
     //     name : 'Rohan Babbar'
     // })
     if (!req.query.name) {
         return res.send({
             error: 'You must provide a search term!'
         })
     }
     movie(req.query.name,(error,data)=>{
         if(error){
             return res.send({error:error})
         }
           res.json({
               title : data.Title,
               plot : data.Plot,
               genre : data.Genre,
               actors : data.Actors,
               imdbRating : data.imdbRating,
               dvd : data.DVD,
               poster : data.Poster
           })
     })
 })

//Parsing incoming Json to an object to access it in our request handler
app.use(express.json())

app.get('*',(req,res)=>{ //error handling
res.render('404',{
    title: 'Movie',
    name: 'Rohan Babbar',
    errorMessage : 'Oops...Page Not Found :('
})
})
//Adding server listen call
app.listen(port,()=>{
    console.log(`Server Is Up On Port ${port}`)
});




