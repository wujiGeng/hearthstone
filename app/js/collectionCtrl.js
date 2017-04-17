
hearthStoneApp.controller('CollectionCtrl', function ($scope,Hearthstone) {


var collectionCards = [];

$scope.showingCards = [];

var page = 1;

//get the collected cards 
collectionCards = Hearthstone.GetCollection();
$scope.showingCards = collectionCards;
console.log(collectionCards);

$scope.last10cards = function(){
    page=page-1; 
    if(page<=0){page=1}
    
    $scope.showingCards =[];
    for(var j=page*10-10;j<page*10;j++){
      $scope.showingCards.push(collectionCards[j])
    };
    console.log($scope.showingCards);
    
 }

  $scope.next10cards = function(){
    console.log(collectionCards);

    page=page+1;
    $scope.showingCards =[];
    for(var j=page*10-10;j<page*10;j++){
      $scope.showingCards.push(collectionCards[j])
    }; 
     // console.log(page);
     //  console.log($scope.showingCards);
       if(page*10>=collectionCards.length){page=parseInt(collectionCards.length/10+1)};
 }

 $scope.deleteFromCollection = function(id){

  Hearthstone.DeleteCardFromCollection(id);
  collectionCards = Hearthstone.GetCollection();
  $scope.showingCards = collectionCards;
 }



});