var express  = require("express");
var router   = express.Router();
var User     = require("../models/users");
var passport = require("passport");

//landing route
router.get("/", function(req, res){
    res.render("landing");
});                

//registration route
router.get("/register", function(req, res){
    res.render("register");
});

// handle registration
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Hi "+  user.username + ", Welcome to the YelpCamp! " );
            res.redirect("/camp");
        });
    });
});

// login route
router.get("/login", function(req, res){
    res.render("login");
});

//handle login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/camp",
    failureRedirect: "/login"
}), function(req, res){
    
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are successfully logged out!")
    res.redirect("/camp");
});



module.exports = router;
