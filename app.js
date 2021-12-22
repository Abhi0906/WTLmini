const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');


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
app.get('/courses', (req, res) => {
    res.render('courses');
})
app.get('/register', (req, res) => {
    res.render('register');
})
app.get('/signin', (req, res) => {
    res.render('signin');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Connected to database! Port: ${port}`)
});