let mongoose = require("mongoose");

let clipCommentSchema = new mongoose.Schema({
  body:   String,
  email:   String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "User"
    },
    username: String
  }
});

module.exports = mongoose.model("ClipComment", clipCommentSchema);