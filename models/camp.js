var mongoose = require("mongoose");

  // add a new schema
  var campSchema = mongoose.Schema({
      name: String,
      url: String,
      description: String,
      comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
      }],
      author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
      }
  });
  
  //create a model
module.exports = mongoose.model("newCamp", campSchema);


 
 