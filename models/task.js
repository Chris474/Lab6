let mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    name: String,
    assignTo:{
        type:mongoose.Schema.Types.ObjectId,
        
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    status:{
        type:String,
        required:true
    },
    taskDesc: String

});

let taskModel = mongoose.model('task',taskSchema,'task');
module.exports = taskModel;