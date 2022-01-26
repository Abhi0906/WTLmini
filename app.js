const express = require('express');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Course = require('./models/course');
const path = require('path');
const methodOverride = require('method-override');


const dbUrl = 'mongodb://localhost:27017/wtl';
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection eroor:"));
db.once("open", () => {
    console.log("Database Connected");
});

const app = express();
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

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

app.post('/courses', async (req, res) => {
    const course = new Course({
        title: req.body.newCourse.name,
        description: req.body.newCourse.description,
        duration: req.body.newCourse.duration
    })
    await course.save();
    res.redirect(`/courses/${course._id}`);
})

app.get('/courses/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
        return res.redirect('/courses');
    }
    res.render('coursedetails', { course });
})

app.delete('/courses/:id', async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.redirect('/courses');
})

app.get('/add/:pass', async (req, res) => {
    const pass = req.params.pass;
    if (pass !== "12233") {
        return res.redirect('/');
    }
    res.render('addcourse');
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