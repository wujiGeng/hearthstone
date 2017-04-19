
hearthStoneApp.controller('MainCtrl', function ($scope,Hearthstone) {

  
//
  $scope.setHero = function(type) {
    Hearthstone.SetHero(type);
  }


});