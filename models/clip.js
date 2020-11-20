let mongoose = require("mongoose");

// SCHEMA SETUP
let clipSchema = new mongoose.Schema({
  speaker: String,
  title:   String,
  image:    String,
  duration:    String,
  desc:    String,
  clipUrl:    String,
  date:   String,
  postedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "User"
    },
    username: String
  },
  clipComments: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref:  "ClipComment"
    }

  ]
});

module.exports = mongoose.model("Clip", clipSchema);