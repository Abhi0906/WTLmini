const express = require('express');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Course = require('./models/course');
const User = require('./models/user');
const path = require('path');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

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
const sessionConfig = {
    secret: 'thisissecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');
app.set('/views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You need to Login First!');
        return res.redirect('/signin');
    }
    next();
}

app.get('/', async (req, res) => {
    const courses = await Course.find({});
    res.render('index', { courses });
})
app.get('/home', async (req, res) => {
    const courses = await Course.find({});
    res.render('index', { courses });
})
app.get('/courses', async (req, res) => {
    const courses = await Course.find({});
    res.render('courses', { courses });
})

app.post('/courses', async (req, res) => {
    const course = new Course({
        title: req.body.newCourse.name,
        description: req.body.newCourse.description,
        duration: req.body.newCourse.duration,
        author: req.body.newCourse.author,
        rating: req.body.newCourse.rating,
        link: req.body.newCourse.link,
        image: req.body.newCourse.image
    })
    await course.save();
    req.flash('success', 'Successfully Added a new Course');
    res.redirect(`/courses/${course._id}`);
})

app.get('/courses/:id', isLoggedIn, async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
        req.flash('error', 'Cannot find the Course');
        return res.redirect('/courses');
    }

    res.render('coursedetails', { course });
})

app.delete('/courses/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the course');
    res.redirect('/courses');
})

app.get('/add/:pass', isLoggedIn, async (req, res) => {
    const pass = req.params.pass;
    if (pass !== "12233") {
        return res.redirect('/');
    }
    res.render('addcourse');
})
app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            req.flash('success', 'Welcome');
            res.redirect('/');
        });
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
});

app.get('/signin', (req, res) => {
    res.render('signin',);
})

app.post('/signin', passport.authenticate('local', { failureFlash: true, failureRedirect: '/signin' }), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out!');
    res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Connected to database! Port: ${port}`)
});