app.controller('editController',['$scope','$state','$resource','$location','$stateParams',
	function($scope,$state,$resource,$location,$stateParams){
	console.log('editController');

	// var n = 1;
	// $(document).ready(function() {
	// 	console.log("ready");
 //    	$(window).resize(function() {
 //    		console.log(n++);
 //        	var bodyheight = $(this).height();
 //        	$("#textID").height(bodyheight * 0.7);
 //    	}).resize();
	// });


	$(document).ready(function() {
		console.log("ready");
    	$(window).resize(function() {
    		console.log(n++);
        	var bodyheight = $(this).height();
        	$("#simditorID").height(bodyheight * 0.7);
    	}).resize();
	});

	$scope.noteID = $stateParams.id;
	if ($scope.noteID) {
		var noteList = $resource('/api/notes/:id',{id:$scope.noteID});
		noteList.get({id: $scope.noteID}, function(note){
			debugger;
			$scope.note = note;
		});
	}

	$scope.submit = function(){

		// var text =

		if ($scope.noteID > 0) {
			$scope.note.noteID = $scope.noteID;
			debugger;
			var noteList = $resource('/api/notes/:id',{id:$scope.noteID},{update:{ method: 'PUT' }});
			noteList.update($scope.note, function(info){
				if (info.nModified == 1) {
					console.log('Modified');
					$location.path('/admin/list');
				};
			});
		} 
		else {
			var noteList = $resource('/api/notes/new');
			debugger;
			noteList.save($scope.note, function(){
				$location.path('#/admin/list');
			});
		}
	};
}]); 