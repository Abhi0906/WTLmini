const mongoose = require('mongoose');
const Course = require('./models/course');

mongoose.connect('mongodb://localhost:27017/wtl');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});


const seedDB = async () => {
    // await Course.deleteMany({});
    const course = new Course({
        title: 'Web Development For Beginners',
        description: 'This Website development course will teach you about how to create a website from scratch. This web development course is designed for beginners with an aim to take HTML5, CSS3, JavaScript/ES5/ES6 and other concepts to advanced level. You will be able to create a website easily after watching this. This tutorial series is for all those people who want to build career in Web development industry. This video series starts with HTML5 basics and then moves towards advanced CSS3 after which JavaScript and other concepts are discussed. HTML, CSS and JavaScript concepts are taught in depth with exercises and quizzes in between. At the end I have shown you plenty of responsive beautiful websites with source code so that you can gain confidence in web development for life! I hope you will like this course.',
        duration: '1 Days 10 hrs',
        rating: 5,
        author: 'CodeWithHarry',
        link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    })
    await course.save();
}

seedDB().then(() => {
    mongoose.connection.close();
});