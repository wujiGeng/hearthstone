
hearthStoneApp.controller('LoginCtrl', function ($scope, $firebaseObject, Hearthstone) {

	$scope.message = "";
	// Firebase
	var accountsRef = firebase.database().ref('/users/');
	var accountsObj = $firebaseObject(accountsRef);
	var userPassDict = [];
	// to take an action after the data loads, use the $loaded() promise
	accountsObj.$loaded().then(function() {
		console.log("loaded record:", accountsObj.$id, accountsObj.$value);

	// To iterate the key/value pairs of the object, use angular.forEach()
		angular.forEach(accountsObj, function(value, key) {
			//console.log(key);
			//console.log(value.pass);
			userPassDict.push({
				idx:	key,
				pass:	value.pass
			});
		});
	});
	
	$scope.accountsObj = accountsObj;
	//Function
	$scope.checkLogin = function() {
    var found = false;
	userPassDict.forEach(function(obj){
		console.log($scope.username);
		if($scope.username === obj.idx){
			found = true;
			if ($scope.password === obj.pass) {
				// Pass username to model and start game
				Hearthstone.setUsername($scope.username);
				//$scope.checkLink();
				$scope.message = "login success";
				window.location.href = "#!/home";
			} else {
				$scope.message = "Your password was incorrect.";
			}
  		}
	});
    if (!found) {
      $scope.message = "No account with that username was found.";
    }
  }
  
  $scope.checkRegistration = function() {
	window.location.href = "#!/regi";
  }
 

});
