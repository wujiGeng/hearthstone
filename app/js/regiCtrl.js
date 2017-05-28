
hearthStoneApp.controller('RegiCtrl', function ($scope, $firebaseObject, Hearthstone) {

	$scope.message = "";
	// Firebase
	var accountsRef = firebase.database().ref('/users/');
	var accountsObj = $firebaseObject(accountsRef);
	var userPassDict = [];
	var regiFlag = 0;
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
	$scope.checkRegi = function() {
		var regiFlag = 1;
		if ($scope.password === $scope.repeat_password){		
		var found = false;
		userPassDict.forEach(function(obj){
			console.log($scope.username);
			if($scope.username === obj.idx){
			found = true;
			}
		});
		if (!found) {
			//write database
			accountsRef.child($scope.username).child('pass').set($scope.password);
			accountsRef.child($scope.username).child('collection').set(0);
			accountsRef.child($scope.username).child('deck').set(0);
			accountsRef.child($scope.username).child('name').set($scope.username);

			Hearthstone.setUsername($scope.username);
			$scope.message = "Registration success ^_^\nGoing to home page in a few seconds ...";
			setInterval(function(){window.location.href = "#!/home"},2000);
			//window.location.href = "#!/home";
		}
		else {
			$scope.message = "User name already been used";
		}
		}
		else{
			$scope.message = "comfirm your password again";
		}
  }
  
  $scope.backLogin = function() {
	  window.location.href = "#!/login";
  }
 

});
