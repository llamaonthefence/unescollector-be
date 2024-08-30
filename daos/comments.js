const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({

    comment_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true, 
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    site_id: {
        type: Number,
        required: true 
    },
    comment_title: {
        type: String, 
        required: true
    },
    comment_text: {
        type: String, 
        required: true
    },
    comment_likes: {
        type: Number,
        required: true
    }, 
    created_at: {
        type: Date, 
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Comments", commentSchema);