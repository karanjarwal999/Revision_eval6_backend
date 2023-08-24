const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, required: true ,ref:'user'},
        title: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true },
        likes: { type: Number, required: true },
        date: { type: String, required: true },
        comment: { type: mongoose.Types.ObjectId, ref:'comment'}
    }
)

module.exports = mongoose.model('blog',blogSchema)


// "id" : 1
//     "username": "coreyschafer",
//     "title": "Be Present",
//     "content": "Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.",
// 		"category" : "Entertainment",
// 		"date" : "2017-06-01",
// 		"likes" : 24,
// 		"comments" : [{usernam