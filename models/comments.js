var mongoose = require("mongoose");

  // add a new schema
  var commentSchema = mongoose.Schema({
      text: String,
      author:{
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
      }
  });
  
  //create a model
module.exports = mongoose.model("comment", commentSchema);


 
 