var mongoose = require("mongoose");

// SHCEMA SETUP
var postSchema =new mongoose.Schema({
    author: String,
    title: String,
    body: String,
    image: String,
    date: String,
    postedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        } 
    ]
});


module.exports = mongoose.model("Post", postSchema);

