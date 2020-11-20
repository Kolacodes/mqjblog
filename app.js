var express         = require ("express");
    app             = express(),
    port            = process.env.PORT || 3000,
    bodyParser      = require ("body-parser"),
    fetch           = require ("node-fetch"),
    mongoose        = require ("mongoose"),
    methodOverride  = require("method-override"),
    Post            = require ("./models/post"),
    Comment         = require ("./models/comment"),
    Clip         = require ("./models/clip"),
    ClipComment         = require ("./models/clipComment"),

    passport        = require ("passport"),
    flash           =  require("connect-flash"),
    LocalStrategy   = require ("passport-local"),
    User            = require ("./models/user"),
    
    indexRoutes = require("./routes/index"),
    postRoutes = require("./routes/posts"),
    commentRoutes = require("./routes/comments"),
    clipRoutes    = require("./routes/clips"),
    salesRoutes   = require("./routes/sales"),
    shortstoriesRoutes   = require("./routes/shortstories"),
    // url             = "mongodb://localhost/mqj_blog";
    url = "mongodb+srv://root:mypassword@bookreviewcluster-mrefw.mongodb.net/mqjreaders?retryWrites=true&w=majority";


app.use(bodyParser.urlencoded({extended: true}, { useNewUrlParser: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/mqj_blog");

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true} )
  .then(() => {
    console.log('Mongo Connected')
  })
  .catch(function(err){
    console.log(err);
  });


  app.use(methodOverride("_method"));
  app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Allah scales me through!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next ){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});

//requiring routes
app.use("/", indexRoutes);
app.use("/posts", postRoutes); 
app.use("/posts/:id/comments", commentRoutes);
app.use("/clips", clipRoutes);
app.use("/sales", salesRoutes);
app.use("/shortstories", shortstoriesRoutes);


app.listen(port, function(){console.log("server successfully started..")});