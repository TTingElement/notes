var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/notes');

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
   	var strDate = date.getDate();
   	var time = date.toLocaleTimeString();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        trDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + seperator1 + time;
    return currentdate;
}

router.get('/', function(req, res) {
    var collection = db.get('noteList');
    collection.find({}, function(err, noteList){
        if (err) throw err;
      	res.json(noteList);
    });
});

router.post('/new',function(req,res){
	var collection = db.get('noteList');
	collection.find({},function(err,noteList){
		if(err) throw err;
		var total = noteList.length;
		var noteIndex = total + 1001;
		var tempNote = req.body;
		tempNote.released = false;
		tempNote.createDate = getNowFormatDate();
		tempNote.modifiedDate = getNowFormatDate();
		tempNote.noteID = noteIndex;
		collection.insert(tempNote,function(err, newNote){
			if(err) throw err;
			res.json(newNote);
		});
	});
});

router.get('/:id',function(req, res){
	var collection = db.get('noteList');
	var noteID = parseInt(req.params.id);
	collection.findOne({'noteID':noteID},function(err, note){
		if (err) throw err;
		res.json(note);
	});
});

router.put('/:id',function(req,res){
	var collection = db.get('noteList');
	var noteID = parseInt(req.params.id);
	var note = req.body;
	console.log("############# put ############");
	console.log(note)
	var curretDate = new Date();
	note.modifiedDate = getNowFormatDate();
	collection.update({'noteID':noteID},note,function(err, info){
		console.log("############# put finish ############");
		console.log(note)
		if (err) throw err;
		res.json(info);
	});
});


module.exports = router;