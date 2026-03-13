const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js')

//Connect to Mongo
mongoose.connect('mongodb://localhost:27017/partyWishlist');


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const app = express();

app.engine('ejs', ejsMate)
//set view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))


const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    //Save session even with no data
    saveUninitialized: true,
    //Cookie stores the session id
    cookie: {
        //Prevents js access
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

//Now EVERY request gets req.session
app.use(session(sessionConfig))
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

app.use(flash());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
//What routes do we need?
//Home/Login
app.get('/register', (req, res) => {
    res.render('home')
});

app.post('/register', async(req, res) => {
    const { username, email, password } = req.body
    const user = new User({
        username,
        email,
    })
    const registeredUser = await User.register( user, password)
    console.log(registeredUser);
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    res.send('Hello, You can now login!')
})

//Parents Dash 
//This is a protected route
//Use middleware to protect this step
app.get('/dashboard', async (req, res) => {
    //Find the user 
    const user = await User.findById(req.user._id)
    res.render('dashboard', { user })
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

