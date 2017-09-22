var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var path = require('path');

app.use(express.static(path.join(__dirname, './anonymousNotes/dist')));

// Database schema
var NoteSchema = new mongoose.Schema({
    content: String,
    createdAt: Date
});
mongoose.model('Notes', NoteSchema);
var Note = mongoose.model('Notes');

app.post('/notes', function(req, res){
    var note = new Note({content: req.body.content, createdAt: Date.now()});
    console.log(req.body)
    note.save(function(err){
        if(err){
            console.log("Did not work.");
        } else{
            console.log("Note saved successfully.");
        }
    })
})

app.get('/notes', function(req, res){
    Note.find({}, function(err, notes){
        if(err){
            console.log("Didn't retrieve the notes.");
        } else{
            console.log("Got the notes, yo.")
            res.json(notes);
        }
    }).sort('-createdAt')
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./anonymousNotes/dist/index.html"))
});

// Setting Server to listen.
app.listen(4200, function(){
    console.log("Listening on port 8000.");
})
