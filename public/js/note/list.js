app.controller('NoteListController', ['$scope', '$state', '$resource','$location',function ($scope, $state, $resource,$location) {
	console.log('NoteListController');

	var notes = $resource('/api/notes');
    notes.query(function(noteList){
        $scope.notes = noteList;
    });
    
    $scope.newNote = function(){
    	debugger;
    	$location.path('/edit/0');
    };

    $scope.editNote = function(note){
    	$location.path('/edit/{int id}',note.noteID);
    };


    $scope.changeReleasedStatu = function(note){
    	debugger;
    	note.released = !note.released;
    	var noteList = $resource('/api/notes/:id',{id:$scope.noteID},{update:{ method: 'PUT' }});
			noteList.update(note, function(info){
				if (info.nModified == 1) {
					console.log('Modified');
					$location.path('/app/list');
				};
		});
    };

}]);