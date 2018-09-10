var express = require("express");
var router  = express.Router();
var newCamp = require("../models/camp");
var middleware = require("../middleware");
// index route
router.get("/", function(req, res){
    //retrieve data from database
        newCamp.find({}, function(err, campData){
        if(err){
            req.flash("error", "Opps! Something went wrong!");
            res.redirect("back");
        }else{
            res.render("campgrounds/index", {campData: campData});
        }
    });
    
});

//new route
router.get("/new", middleware.isLoggedIn,  function(req, res){
    res.render("campgrounds/new");
});

//add new element using post req.
router.post("/", middleware.isLoggedIn, function(req, res){
    var inputName = req.body.name;
    var inputUrl = req.body.url;
    var inputDesc = req.body.description;
    var author = {
                    id: req.user._id, 
                    username: req.user.username
                };
    var inputObj = {name: inputName, url: inputUrl, description: inputDesc, author: author};
    // push the data into database
    newCamp.create(inputObj, function(err, newCamp){
        if(err){
            req.flash("error", "Opps! Something went wrong!");
            res.redirect("back");
        }else{
            console.log("A new camp is added: " + newCamp);
        }
    });
    res.redirect("/camp");
});

//show route 
router.get("/:id", function(req, res){
    newCamp.findById(req.params.id).populate("comment").exec(function(err, campData){
        if(err){
            req.flash("error", "Opps! Something went wrong!");
            res.redirect("back");
        }else{
            res.render("campgrounds/show", {campData: campData})
        }
    });

});

//edit route
router.get("/:id/edit", middleware.checkCampOwnership, function(req, res){
    newCamp.findById(req.params.id, function(err, campfound){
        if(err){
            req.flash("error", "Opps! Something went wrong!");
            res.redirect("back");
        }else{
            res.render("campgrounds/edit", {campData: campfound});
        }
    });
});

// update route
router.put("/:id", middleware.checkCampOwnership, function(req, res){
    newCamp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, campUpdated){
        if(err){
            req.flash("error", "Opps! Something went wrong!");
            res.redirect("back");
        }else{
            req.flash("success", "Your campData has been updated successfully!");
            res.redirect("/camp/"+req.params.id);
        }
    });
});

// destroy route
router.delete("/:id", middleware.checkCampOwnership, function(req, res){
    newCamp.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Opps! Something went wrong!");
            return res.redirect("/camp");
        }
        req.flash("success", "CampData has been deleted!");
        res.redirect("/camp");
    });
});



module.exports = router;