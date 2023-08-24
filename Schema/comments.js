const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        post: { type: String, required: true },
        user: { type: mongoose.Types.ObjectId, required: true , ref:'user'},
        title: { type: String, required: true },
    }
)

module.exports = mongoose.model('comment',commentSchema)