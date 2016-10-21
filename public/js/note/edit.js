app.controller('editController',['$scope','$state','$resource','$location','$stateParams',
	function($scope,$state,$resource,$location,$stateParams){
	console.log('editController');

	$scope.noteID = $stateParams.id;
	if ($scope.noteID) {
			var noteList = $resource('/api/notes/:id',{id:$scope.noteID});
			noteList.get({id: $scope.noteID}, function(note){
				$scope.note = note;
			});
		}

	$scope.submit = function(){
		if ($scope.noteID > 0) {
			$scope.note.noteID = $scope.noteID;
			var noteList = $resource('/api/notes/:id',{id:$scope.noteID},{update:{ method: 'PUT' }});
			noteList.update($scope.note, function(info){
				if (info.nModified == 1) {
					console.log('Modified');
					$location.path('/app/list');
				};
			});
		} 
		else {
			var noteList = $resource('/api/notes/new');
			noteList.save($scope.note, function(){
				$location.path('/app/list');
			});
		}
	};
}]); 