const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: String,
    description: String,
    duration: String,
    rating: Number,
    author: String,
    link: String,
    image: String
});


module.exports = mongoose.model('Course', CourseSchema);
