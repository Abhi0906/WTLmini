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
        title: 'Second Course',
        description: 'abcaskjfhb ksehf jah gakyyg kyig kyg kjyhfgvjgh',
        duration: '35 Days'
    })
    await course.save();
}

seedDB().then(() => {
    mongoose.connection.close();
});