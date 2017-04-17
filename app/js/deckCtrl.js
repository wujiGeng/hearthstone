
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

  //get cards of selected class and neutural class
$scope.classCards = function(){
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

    // });
   });
 }

 $scope.classCards();



 $scope.last10cards = function(){
    page=page-1; 
    if(page<=0){page=1};
    $scope.showingCards =[];
    for(var j=page*10-10;j<page*10;j++){
      $scope.showingCards.push(shownCards[j])
    };
    return $scope.showingCards;  

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
    return $scope.showingCards;  

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
    


  




});
