var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/notes');

router.get('/', function(req, res) {
    var collection = db.get('noteList');
    collection.find({}, function(err, noteList){
        if (err) throw err;
      	res.json(noteList);
    });
});

module.exports = router;