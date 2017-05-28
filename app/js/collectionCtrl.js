
hearthStoneApp.controller('CollectionCtrl', function ($scope,Hearthstone) {


var collectionCards = [];

$scope.showingCards = [];

var page = 1;

//get the collected cards 
collectionCards = Hearthstone.GetCollection();
$scope.showingCards = collectionCards;
console.log(collectionCards);

//to hide the dragging card from its original place
$scope.startCallback = function (event, ui) {
  var $draggable = $(event.target);
  ui.helper.width($draggable.width());
  ui.helper.height($draggable.height());
  $draggable.css('opacity', '0');
};

 $scope.last10cards = function(){
    var p = page;
    var s = shownCards;
    $scope.showingCards = Hearthstone.PageDown(p,s);
    if(page<=1){page=1}
      else {page = page-1;}
 }

  $scope.next10cards = function(){

    var p = page;
    var s = shownCards;
    $scope.showingCards = Hearthstone.PageUp(p,s);
    if(page*10>=shownCards.length){page=parseInt(shownCards.length/10+1)}
      else{page = page+1;}
 }

 $scope.deleteFromCollection = function(id){

  Hearthstone.DeleteCardFromCollection(id);
  collectionCards = Hearthstone.GetCollection();
  $scope.showingCards = collectionCards;
 }



});