const express = require('express')
const mongoose = require("mongoose")
const product = require('./models/products')

const app =  express()
const PORT = 3000

const DATABASE_URL = ''

const db = mongoose.connection

mongoose.connect(DATABASE_URL)