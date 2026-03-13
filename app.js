const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//Connect to Mongo
mongoose.connect('mongodb://localhost:27017/partyWishlist');


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const app = express();
//set view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))

//Routes
//What routes do we need?
//Home/Login
app.get('/', (req, res) => {
    res.render('home')
});

//Parents Dash 
//This is a protected route
app.get('/dashboard', (req, res) => {
    res.render('dashboard')
});

app.get('/wishes', (req, res) => {

});

//This shows the wishes form
app.get('/wishes/new', (req, res) => {

});

//This posts to the wishes
app.post('/wishes', (req, res) => {

});

//This shows details about one wish based on the id
//This deletes the route

app.listen(8000, () => {
    console.log("Listening on port 8000")
});

