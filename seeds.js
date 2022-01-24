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
        title: 'Fifth Course Course',
        description: 'This is Fifth Course ',
        duration: '50 Days'
    })
    await course.save();
}

seedDB().then(() => {
    mongoose.connection.close();
});