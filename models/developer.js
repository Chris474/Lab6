let mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    name:{
        firstName:{
            type:String,
            required:true
        },
        lastName:String
    },

    level: String,
    address:{
        state: String,
        suburb: String,
        street: String,
        unit: String
    }
});


let developerModel = mongoose.model('developer',developerSchema,'developer');
module.exports = developerModel;