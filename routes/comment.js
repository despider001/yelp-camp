var express = require("express");
var router  = express.Router({mergeParams: true});
var newCamp = require("../models/camp");
var comment = require("../models/comments");
var middleware = require("../middleware");

// comment/new route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    newCamp.findById(req.params.id, function(err, campData){
        if(err){console.log(err);}else{
            res.render("comments/new", {campData: campData});
        }
    });
    
});

// create comment route
router.post("/", middleware.isLoggedIn, function(req, res){
    //find campground of that id
    newCamp.findById(req.params.id, function(err, camp){
        if(err){console.log(err);}else{
            
            
            // create comment
            comment.create(req.body.comment, function(err, newComment){
                if(err){console.log(err);}else{
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    camp.comment.push(newComment);
                    camp.save(function(err, camp){
                     if(err){console.log(err);}else{
                            req.flash("success", "Your comment has been added!")
                            res.redirect("/camp/"+req.params.id);
                        }
                     });
                }   
            });
        }
    });
});

// edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    newCamp.findById(req.params.id, function(err, camp) {
        if(err){
            res.redirect("/camp");
        }else{
            
        comment.findById(req.params.comment_id, function(err, commentFound) {
            if(err){
                res.redirect("back");
            }else{
                res.render("comments/edit", {comment: commentFound, campData: camp}); 
            }
        });
    }
  });
});

//update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, commentUpdated){
        if(err){
                res.redirect("/camp/"+ req.params.id);
            }else{
                req.flash("success", "Your comment has been updated!")
                res.redirect("/camp/"+ req.params.id);
            }
    });
});

//destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          return res.redirect("back");
      }
          req.flash("success", "Your comment has been deleted!")
          res.redirect("back");
   });
});



module.exports = router;