var mongoose              = require("mongoose");
mongoose.connect('mongodb://localhost/yelp_camp_v3');

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    mongoose.connection.db.collectionNames(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
    });
})