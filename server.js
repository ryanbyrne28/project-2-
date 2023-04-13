const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/products')
const methodOverride = require('method-override')



const app =  express()
require('dotenv').config()
const port = process.env.PORT || 4000




mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection


db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
app.use(express.urlencoded({extended:false}))

//middleware
// Middleware
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static('public'));

const productsController = require('./controllers/products')
app.use('/products', productsController)


app.get('/', (req, res) => {
    res.render('home.ejs')
})


const PORT= process.env.PORT
app.listen(PORT)
console.log('hello')