app.controller('previewController',['$scope','$stateParams','$resource',function($scope,$stateParams,$resource){
	console.log("previewController");
	$scope.noteID = $stateParams.id;
	if ($scope.noteID > 0){
		debugger;
		var noteList = $resource('/api/notes/:id',{id:$scope.noteID});
		noteList.get({id: $scope.noteID},function(note){
			debugger;
			$scope.note = note;
		});
	}
}]);