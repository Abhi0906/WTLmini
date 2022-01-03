const express = require('express');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Course = require('./models/course');
const path = require('path');

const dbUrl = 'mongodb://localhost:27017/wtl';
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection eroor:"));
db.once("open", () => {
    console.log("Database Connected");
});

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('/views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/home', (req, res) => {
    res.render('index');
})
app.get('/courses', async (req, res) => {
    const courses = await Course.find({});
    res.render('courses', { courses });
})
app.get('/courses/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
        return res.redirect('/courses');
    }
    res.render('coursedetails', { course });
})
app.get('/register', (req, res) => {
    res.render('register');
})
app.get('/signin', (req, res) => {
    res.render('signin',);
})

const port = 3000;
app.listen(port, () => {
    console.log(`Connected to database! Port: ${port}`)
});