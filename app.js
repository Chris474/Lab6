let mongoose = require('mongoose');
let express = require('express');
let bodyParter=require('body-parser');

let app = new express();

app.use(express.static('css'));
app.use(express.static('img'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use(bodyParter.urlencoded({extended:false}));

var filePath = __dirname + '/views/';

mongoose.connect('mongodb://localhost:27017/lab6',function(err){
    if(err){
        console.log(err);
        throw err;
    }
    else{
        console.log('connected successfully!');
        
    }
});

let task = require('./models/task');
let developer = require('./models/developer');

app.get('/',function(req,res){
    res.sendFile(filePath+'index.html');
});

app.get('/addNewdeveloper',function(req,res){
    let fileName = filePath+'/addNewdeveloper.html';
    res.sendFile(fileName);
});

app.post('/addNewdeveloperInfo',function(req,res){
    developer.create({
        name:{
            firstName:req.body.firstname,
            lastName:req.body.lastname
        },
        level:req.body.level,
        address:{
            state:req.body.state,
            suburb:req.body.suburb,
            street:req.body.street,
            unit:req.body.unit,
        }
    },function(err,data){
        if(err){
            throw err;
        }
        else{
            console.log('add developer successfully!');
        }
    });
});

app.get('/listAlldeveloper',function(req,res){
    developer.find({}).exec(function(err,data){
        res.render('listAlldeveloper',{data:data});
    });
});

app.get('/addNewtask',function(req,res){
    let fileName = filePath+'/addNewtask.html';
    res.sendFile(fileName)
});


app.post('/addNewtaskInfo',function(req,res){
    task.create({
        name:req.body.taskName,
        assignTo:req.body.assignTo,
        dueDate:req.body.dueDate,
        status:req.body.status,
        taskDesc:req.body.Description
    },function(err){
        if(err){
            throw err;
        }
        else{
            task.find({}).exec(function(err,data){
                if(err){
                    throw err;
                }
                else{
                    res.render('listAlltask',{data:data});
                }
            });
            console.log('add task successfully!');
        }
    });
});

app.get('/listAlltask',function(req,res){
    task.find({}).exec(function(err,data){
        if(err){
            throw err;
        }
        else{
            res.render('listAlltask',{data:data});
        }
    });
});

app.get('/deleteTask',function(req,res){
    fileName = filePath + '/deleteTask.html';
    res.sendFile(fileName);
});

app.post('/deleteTaskId',function(req,res){
    
    task.deleteOne({_id:req.body.id},function(err){
        res.redirect('/listAlltask');
    });
});

app.get('/deleteAllComTask',function(req,res){
    task.deleteMany({status:'Complete'},function(err){
        res.redirect('/listAlltask');
    });
});

app.get('/update',function(req,res){
    fileName = filePath + '/update.html';
    res.sendFile(fileName);
});

app.post('/updateTask',function(req,res){
    task.updateOne({_id:req.body.taskId},{$set:{status:req.body.newStatus}},function(err){
        res.redirect('/listAlltask');
    });
});





app.listen(8080);