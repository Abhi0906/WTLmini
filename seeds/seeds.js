const mongoose = require('mongoose');
const Course = require('../models/course');
const courses = require('./courses');


mongoose.connect('mongodb://localhost:27017/wtl');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});


const seedDB = async () => {
    await Course.deleteMany({});
    for (let i = 0; i < 3; i++) {
        const course = new Course({
            title: `${courses[i].title}`,
            description: `${courses[i].description}`,
            duration: `${courses[i].duration}`,
            rating: `${courses[i].rating}`,
            author: `${courses[i].author}`,
            link: `${courses[i].link}`,
            image: `${courses[i].image}`
        })
        await course.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});