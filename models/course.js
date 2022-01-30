const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: String,
    description: String,
    duration: String,
    rating: Number,
    author: String,
    link: String
    // applications: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Register'
    //     }
    // ]
});

// JobSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await Apply.deleteMany({
//             _id: {
//                 $in: doc.applications
//             }
//         })
//     }
// });

module.exports = mongoose.model('Course', CourseSchema);
