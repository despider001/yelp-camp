var middleware  = {};
var newCamp     = require("../models/camp");
var comment     = require("../models/comments");

middleware.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login");
}

middleware.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                req.flash("error", "Something went wrong!");
                res.redirect("back");
            }else{
                if(comment.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middleware.checkCampOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        newCamp.findById(req.params.id, function(err, camp){
            if(err){
                req.flash("error", "Something went wrong!");
                res.redirect("back");
            }else{
                if(camp.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


module.exports = middleware;