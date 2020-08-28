const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require ('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv/config')

const app = express()

const userRoute = require('./route/usersRoute');
const candidateRoute = require('./route/candidateRoute');

const dburl = process.env.DB_CONNECTION;
mongoose.connect(dburl, {useNewUrlParser: true,useUnifiedTopology: true})
.then( () => {
    console.log('Connected to Database')
})
.catch( (err) =>{
    console.log('Error connecting to database', err)
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret : 'library', resave : 'true', saveUninitialized: true}));
require('./authenticate')(app);

app.use('/users', userRoute);
app.use('/', candidateRoute)

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening to ${port}`)
})

module.exports = app;