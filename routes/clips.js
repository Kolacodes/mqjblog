
let express = require('express'),
    router  = express.Router();
    middleware = require('../middleware'),
    clip       = require('../models/clip'),
    clipComment = require('../models/clipComment'),
    user        = require('../models/user');


router.get("/", function(req, res){
  // find all clips from DB
  clip.find({}, function(error, all_clips){
    if(error){
      console.log(error);
    } else{
      res.render("clips/index", {all_clips:all_clips})
    }
  })
});

// NEW - shows form to create new clip

router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("clips/new")
})

// CREATE new clip in DB

router.post("/", function(req, res){
  // get data from form
  let title = req.body.title;
  let clipUrl = req.body.clipUrl;
  let speaker = req.body.speaker
  let image = req.body.image;
  let duration = req.body.duration;
  let desc = req.body.desc;
  let date = req.body.date;
  let postedBy = {
      id: req.user._id,
      username: req.user.username
  };
  let new_clip = {title:title, clipUrl:clipUrl, speaker:speaker, image:image, duration:duration, desc:desc, date:date, postedBy:postedBy};
  
  // create new clip and save in DB
  clip.create(new_clip, function(err, new_clip){
    if(err){
      console.log(error)
    } else {
      res.redirect("/clips");
    }
  })
})

// SHOW ROUTE 4 -- shows more info about a new clip

router.get("/:id", function(req, res){
  // Find the clip with the provided id
  clip.findById(req.params.id).populate("clipComments").exec(function(err, found_clip){
    if(err){
      console.log(err)
    } else {
      res.render("clips/show", {found_clip: found_clip})
    }
  })
});


module.exports = router;