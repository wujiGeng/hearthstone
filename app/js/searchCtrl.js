
hearthStoneApp.controller('SearchCtrl', function ($scope,Hearthstone) {


var rawCards = [];
$scope.savedCards = [];
var shownCards = [];

$scope.showingCards = [];
$scope.loadingFlag = 1;


var page = 1;


  $scope.functionChoose = function(type){
    $scope.functionFlag=0;
    if(type == 'Class'){$scope.functionFlag=1};
    if(type =='Type'){$scope.functionFlag=2};
    if(type =='Quality'){$scope.functionFlag=3};
    if(type =='Race'){$scope.functionFlag=4};
    return $scope.functionFlag;

 }
  
  $scope.search = function(name) {
    $scope.loadingFlag=0;
    console.log($scope.loadingFlag);
    Hearthstone.CardSearch.query({name:name},function(data){    
    rawCards = data;
    shownCards = Hearthstone.Filter(rawCards); 
    $scope.savedCards = shownCards;
    $scope.showingCards = shownCards;
    $scope.loadingFlag=1;
    console.log($scope.loadingFlag);
   });
 }
 
 $scope.classSearch = function(classes){
  $scope.loadingFlag=0;
  Hearthstone.CardClass.query({class:classes},function(data) {
    rawCards = data;

    shownCards = Hearthstone.Filter(rawCards); 
    $scope.savedCards = shownCards;
    $scope.showingCards = shownCards;
    console.log(shownCards);
    $scope.loadingFlag=1;
/*    console.log($scope.showingCards);*/

  });
 }
  
 $scope.qualitySearch = function(quality){
  $scope.loadingFlag=0;
  Hearthstone.CardQuality.query({quality:quality},function(data) {
    rawCards = data;
    shownCards = Hearthstone.Filter(rawCards); 
    $scope.savedCards = shownCards;
    $scope.showingCards = shownCards;
    $scope.loadingFlag=1;
  });
 }

 $scope.raceSearch = function(race){
  $scope.loadingFlag=0;
  Hearthstone.CardRace.query({race:race},function(data) {
    rawCards = data;
    shownCards = Hearthstone.Filter(rawCards); 
    $scope.savedCards = shownCards;
    $scope.showingCards = shownCards;
    $scope.loadingFlag=1;
  });
 }

 $scope.typeSearch = function(type){
  $scope.loadingFlag=0;
  Hearthstone.CardType.query({type:type},function(data) {
    rawCards = data;
    shownCards = Hearthstone.Filter(rawCards); 
    $scope.savedCards = shownCards;
    $scope.showingCards = shownCards;
    $scope.loadingFlag=1;
  });
 }
   

 $scope.last10cards = function(){
    page=page-1; 
    if(page<=0){page=1}
      else{
    $scope.showingCards =[];
    for(var j=page*10-10;j<page*10;j++){
      $scope.showingCards.push(shownCards[j])
    };
    } 
 }

  $scope.next10cards = function(){
    console.log(shownCards);

    page=page+1;
    $scope.showingCards =[];
    for(var j=(page-1)*10;j<page*10;j++){
      $scope.showingCards.push(shownCards[j])
    }; 
    console.log(page);
       console.log($scope.showingCards);
       if(page*10>=shownCards.length){page=parseInt(shownCards.length/10+1)};
 }

 $scope.costFilter = function(cost,cards) {

  $scope.showingCards = [];
  //shownCards = [];
  shownCards = Hearthstone.CostFilter(cost,cards);
  $scope.showingCards = shownCards;

}

 $scope.attackFilter = function(attack,cards) {

  $scope.showingCards = [];
  //shownCards = [];
  shownCards = Hearthstone.AttackFilter(attack,cards);
  $scope.showingCards = shownCards;

}

 $scope.healthFilter = function(health,cards) {

  $scope.showingCards = [];
  //shownCards = [];
  shownCards = Hearthstone.AttackFilter(health,cards);
  $scope.showingCards = shownCards;

}

 $scope.durabilityFilter = function(durability,cards) {

  $scope.showingCards = [];
  //shownCards = [];
  shownCards = Hearthstone.AttackFilter(durability,cards);
  $scope.showingCards = shownCards;

}

//这是啥？？
   $scope.showFunction = function(){

   	return $scope.functionFlag;
 }

$scope.showDetail = function(id){
    console.log(id);
    $scope.singleCard =[];

    Hearthstone.Card.query({name:id},function(data) {

    $scope.singleCard = data;
    console.log($scope.singleCard);

  });
    }

    $scope.addToCollection = function(card){

      Hearthstone.AddCardToCollection(card);
    }
 

});
