var mongoose = require("mongoose");
passportLocalMongoose = require ("passport-local-mongoose");


// SHCEMA SETUP
var UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);