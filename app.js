var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://mongo:27017/bookAPI', {useNewUrlParser: true})
                 .then(() => console.log('Mongo Connected'))
                 .catch(err => console.log(err))
                 
var Book = require('./models/bookModel');

var app = express();
var port =  3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api', bookRouter);


app.get('/', function(req, res){
    res.send('welcome to my bookstore');
})

app.listen(port, function(){
   console.log('bulb is running on port number : ', port);
});