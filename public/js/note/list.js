app.controller('NoteListController', ['$scope', '$state', '$resource',function ($scope, $state, $resource) {
	console.log('NoteListController');

	var notes = $resource('/api/notes');
    notes.query(function(noteList){
        $scope.notes = noteList;
    });

}]);