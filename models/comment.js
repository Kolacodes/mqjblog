var mongoose = require("mongoose");

// SHCEMA SETUP
 var commentSchema = new mongoose.Schema({
     body: String,
     email: String,
     author: {
         id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
         },
         username: String
     }
     
 })

module.exports = mongoose.model("Comment", commentSchema);



