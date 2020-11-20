//all middleware goes here

var Post = require("../models/post");
var Comment = require("../models/comment");
flash           =  require("connect-flash");



var middlewareObj = {};



//middleware  1

middlewareObj.checkPostOwnership = function(req, res, next){
  if(req.isAuthenticated()){
          Post.findById(req.params.id, function(err, foundPost){
            if(err){
              console.log(err);
              //  res.redirect("/back");
           } else {
          // does user own the book?
              if(String(foundPost.postedBy.id) === String(req.user._id)){
               next();
              } else {
                  req.flash("error", "You do not have permission to do that");                
              }
           }
      });
    } else {
      req.flash("error", "You need to be logged in to do that");      

    }
};


//middleware  2

middlewareObj.checkCommentOwnership = function (req, res, next){
  if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
              req.flash("error", "Post not found");
              res.redirect("back");
              //  res.redirect("/back");
           } else {
          // does user own the comment?
              if(String(foundComment.author.id) === String(req.user._id)){
               next();
              } else {
              req.flash("error", "You don't have permission to do that");
                res.redirect("back");
                
              }
           }
      });
    } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");

    }

};


//middleware  3

middlewareObj.isLoggedIn = function (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login")
};



module.exports = middlewareObj