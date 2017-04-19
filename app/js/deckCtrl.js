
hearthStoneApp.controller('DeckCtrl', function ($scope,Hearthstone) {


var rawCards = [];

var shownCards = [];

var neutralCards = [];

$scope.savedCards = [];

$scope.showingCards = [];

$scope.selectedCards = [];

$scope.progressBar = [];

$scope.progressFlag = 0;
  
$scope.heroType = "";

var page = 1;
$scope.loadingFlag=0;


  //get cards of selected class and neutural class
$scope.classCards = function(){
$scope.loadingFlag=0;

   var classes = Hearthstone.GetHero();
   $scope.heroType = classes;
   //get cards from selected class
   Hearthstone.CardClass.query({class:classes},function(data) {
    rawCards = data;
    // //get cards from neutral cards
    // Hearthstone.CardClass.query({class:"Neutral"},function(data2) { 
    // neutralCards = data2;
    // //merge the data
    neutralCards = [];
    shownCards = rawCards.concat(neutralCards);
    shownCards = Hearthstone.Filter(shownCards);  
    $scope.savedCards = shownCards;
    $scope.showingCards = shownCards;
    console.log(shownCards);
$scope.loadingFlag=1;


    // });
   });
 }

 $scope.classCards();


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

//card filters
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

//choose a card and add it into the deck
 
    $scope.selectCard = function(card){

        Hearthstone.AddCardToDeck(card);
        Hearthstone.SortCards();
        Hearthstone.SetProgress();
        
        $scope.progressFlag=($scope.progressFlag+1)%2;
        Hearthstone.ShowProgress($scope.progressFlag);

        $scope.progressBars = Hearthstone.GetProgress();
/*        $scope.progressFlag=Hearthstone.ShowProgress(1);*/
        console.log($scope.progressBars);  
      //  $scope.progressBars = Hearthstone.GetProgress();
 }

    $scope.removeFromList = function(cardId){

     Hearthstone.DeleteCardFromDeck(cardId);
     Hearthstone.SetProgress();
     $scope.progressBars = Hearthstone.GetProgress();
     $scope.progressFlag=($scope.progressFlag+1)%2;
     Hearthstone.ShowProgress($scope.progressFlag);
    // $scope.progressBars = Hearthstone.GetProgress();
    }

  $scope.selectedCards = Hearthstone.GetDeck();
  $scope.progressBars = Hearthstone.GetProgress();
    


    $scope.getHeroPic = function(){
    var heroTypePic = "";
    heroTypePic = Hearthstone.GetHeroPic($scope.heroType);
    return heroTypePic;
    console.log(heroTypePic);
  }




});
