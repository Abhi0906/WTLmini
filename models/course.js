const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: String,
    description: String,
    duration: String,
    rating: Number,
    author: String,
    link: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


module.exports = mongoose.model('Course', CourseSchema);
