//========================== yelp_camp =============================
//require all the packages
var express               = require("express"),
    app                   = express(),
    ejs                   = require("ejs"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    newCamp               = require("./models/camp"),
    seedDB                = require("./seeds"),
    comment               = require("./models/comments"),
    User                  = require("./models/users"),
    session               = require("express-session"),
    passport              = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    LocalStrategy         = require("passport-local"),
    methodOverride        = require('method-override'),
    flash                 = require("connect-flash");

/* connect to database
    let dbClient;
     // add credentials as env var
    dbClient = process.env.DATABASEURL;
     // use local db
    dbClient = mongodb://localhost/yelp_camp_v3
     // or use a remote client like mlab
    dbClient = mongodb://username:password@somename.mlab.com:33004/databaseName
    mongoose.connect(dbClient);
*/
//Seed data for new setup 
//seedDB();
 
//use and set the relevant stuff
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

//================= Configure passport =====================

// set parameters for express-session
app.use(session({
    secret:"anyOddThatSatisfiesYou",
    resave: false,
    saveUninitialized: false,
}));

//initialize passport and use session
app.use(passport.initialize());
app.use(passport.session());

// decalre the authentication method
passport.use(new LocalStrategy(User.authenticate()));

// serialize and deserialize the user to use session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// show login, register and logout menu appropriatly 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// require all the routes
var indexRoute   = require("./routes/index");
var campRoute    = require("./routes/camp");
var commentRoute = require("./routes/comment");

// use all the routes
app.use("/", indexRoute);
app.use("/camp", campRoute);
app.use("/camp/:id/comment", commentRoute);

// set the app to listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("App is up and running!"); 
});