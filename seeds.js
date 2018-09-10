var mongoose = require("mongoose");
var newCamp  = require("./models/camp");
var comment  = require("./models/comments");

var seedData = [{name: "Ankara",
                url: "http://www.kampyap.com/wp-content/uploads/2014/05/isik-dagi.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
                {name: "Istanbul",
                url: "https://mediap.flypgs.com/awh/400/400//files/sehirlergorsel/istanbul.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
                {name: "Adana",
                url: "https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}];

function seedDB(){
    // remove all data
     newCamp.remove({}, function(err, camp){
        if(err){console.log(err);}else{ 
            console.log("everything removed!");
            
            // insert new data
            seedData.forEach(function(seed){
                newCamp.create(seed, function(err, campNew){if(err){console.log(err);}else{
                    // create comment
                    comment.create({
                        text: "This is a comment",
                        author: "Shamim"
                    }, function(err, comment){if(err){console.log(err);}else{
                        //push the comment and save to DB
                        campNew.comment.push(comment);
                        campNew.save(function(err, camp){if(err){console.log(err);}else{
                            console.log("comment added");
                        }});
                    }});
                 }});
            });
        }
    });
}

module.exports = seedDB;