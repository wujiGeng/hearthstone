
hearthStoneApp.controller('CollectionCtrl', function ($scope,Hearthstone) {


var shownCards = [];

$scope.showingCards = [];

var page = 0;

  $scope.classSearch = function(){
   var classes = Hearthstone.GetHero();
   Hearthstone.CardClass.query({class:classes},function(data) {
    rawCards = data;
    shownCards = Hearthstone.Filter(rawCards);  
  });
 }
 

  $scope.search = function(name) {
    Hearthstone.CardSearch.query({name:name},function(data){		
   		rawCards = data;
   		$scope.shownCards = Hearthstone.filter(rawCards);
   });
 }

 $scope.last10cards = function(){
    page=page-1; 
    if(page<=0){page=1};
    $scope.showingCards =[];
    for(var j=page*10-10;j<page*10;j++){
      $scope.showingCards.push($scope.shownCards[j])
    };
    return $scope.showingCards;  

 }

  $scope.next10cards = function(){
    console.log($scope.shownCards);

    page=page+1;
    $scope.showingCards =[];
    for(var j=(page-1)*10;j<page*10;j++){
      $scope.showingCards.push($scope.shownCards[j])
    }; 
    console.log(page);
       console.log($scope.showingCards);
       if(page*10>=$scope.shownCards.length){page=parseInt($scope.shownCards.length/10)};
    return $scope.showingCards;  

 }

 $scope.Select = function(cost,attack,health) {

  var oldCards = savedCards;
  $scope.shownCards=[];


  for (var i=0;i<oldCards.length;i++){

      if(cost!="undefined"){
        if (oldCards[i].cost==cost){
          $scope.shownCards.push(oldCards[i]);
        }
      };
      if(attack!="undefined"){
        if (oldCards[i].attack==attack){
          $scope.shownCards.push(oldCards[i]);}
      };
      if(health!="undefined"){
        if (oldCards[i].health==health){
          $scope.shownCards.push(oldCards[i]);}
      };


  }

  return $scope.shownCards;

}

    $scope.selectCard = function(cardId){
      var action = 0;
    if($scope.selectedCards.length>30){
      action =1;
    };

      for(var i=0;i<$scope.selectedCards.length;i++){
        if($scope.selectedCards[i].cardId==cardId){

          for(var j=i+1;j<$scope.selectedCards.length;j++){
            if($scope.selectedCards[j].cardId==cardId){

              action =1;
            };
          };
        };

        
      };
      
      if(action!=1){
        for (var i=0;i<$scope.showingCards.length;i++){
        if ($scope.showingCards[i].cardId==cardId){
          $scope.selectedCards.push($scope.showingCards[i]);

        };
      }
      
      };
      return $scope.showProgress();
      
 }
    
    $scope.showProgress = function(){
      $scope.progressBar=[];

      var barLength = 0;
      for(var i=0;i<=12;i++){
        var barLength = 0;
        for (var j=0;j<$scope.selectedCards.length;j++){
          if (($scope.selectedCards[j].cost==i)&&(i<7)){
            barLength= barLength+1; 
            console.log(barLength);
          };
          if ($scope.selectedCards[j].cost>=7){
            barLength= barLength+1; 
          };
          $scope.progressBar.push(barLength/$scope.selectedCards.length);
        };

      }
      
        console.log($scope.progressBar);
        return $scope.progressBar;
    }
  

    $scope.removeFromList = function(cardId){

      for(var i=0; i< $scope.selectedCards.length; i++){
            if($scope.selectedCards[i].cardId == cardId) {
              $scope.selectedCards.splice(i,1);
                break;
            };
        };
    }
 


});