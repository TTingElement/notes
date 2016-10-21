app.controller('editController',['$scope','$state','$resource','$location','$stateParams',
	function($scope,$state,$resource,$location,$stateParams){
	console.log('editController');

	// $scope.grid_height={height:''+document.getElementById("html").offsetHeight-340+'px'}; 

	var text = document.getElementById('textID');
	text.clientHeight = $(window).innerWidth;
	debugger;

	// $(window).resize(function() {
 //        debugger;
	// });


	var n = 1;
	// $(window).resize(function(){
 //    	console.log(n++);
 //    	var text = document.getElementById('textID');
	// 	text.height = document.body.clientWidth;
	// 	var value = n + "wfef";
	// 	text.value =  value;
	// 	console.log(document.body.clientWidth );
	// });

	$(document).ready(function() {
		console.log("ready");
    $(window).resize(function() {
    	console.log(n++);
        var bodyheight = $(this).height();
        // $("#textID").height(bodyheight * 0.7);
        $("#textID").height(bodyheight * 0.7);
    }).resize();
});

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