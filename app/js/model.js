

hearthStoneApp.factory('Hearthstone',function ($resource) {
  

//Get cards from API by different filters

this.CardClass = $resource('https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/:class',{},{
 query: {
    method:'GET',
    isArray:true,
    headers: {
      'X-Mashape-Key': 'GaejSX5Zn6mshlxe27FXYyeKwzdpp1tjLtxjsnSBaLVT0IurGX'
    }
  }
});

this.CardQuality = $resource('https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/:quality',{},{
query: {
    method:'GET',
    isArray:true,
    headers: {
      'X-Mashape-Key': 'GaejSX5Zn6mshlxe27FXYyeKwzdpp1tjLtxjsnSBaLVT0IurGX'
    }
  }
});

this.CardRace = $resource('https://omgvamp-hearthstone-v1.p.mashape.com/cards/races/:race',{},{
query: {
    method:'GET',
    isArray:true,
    headers: {
      'X-Mashape-Key': 'GaejSX5Zn6mshlxe27FXYyeKwzdpp1tjLtxjsnSBaLVT0IurGX'
    }
  }
});

this.CardType = $resource('https://omgvamp-hearthstone-v1.p.mashape.com/cards/types/:type',{},{
query: {
    method:'GET',
    isArray:true,
    headers: {
      'X-Mashape-Key': 'GaejSX5Zn6mshlxe27FXYyeKwzdpp1tjLtxjsnSBaLVT0IurGX'
    }
  }
});

this.CardSearch = $resource('https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/:name',{},{
  query: {
    method:'GET',
    isArray:true,
    headers: {
      'X-Mashape-Key': 'GaejSX5Zn6mshlxe27FXYyeKwzdpp1tjLtxjsnSBaLVT0IurGX'
    }

  }
});

this.Card = $resource('https://omgvamp-hearthstone-v1.p.mashape.com/cards/:name',{},{
  query: {
    method:'GET',
    isArray:true,
    headers: {
      'X-Mashape-Key': 'GaejSX5Zn6mshlxe27FXYyeKwzdpp1tjLtxjsnSBaLVT0IurGX'
    }
  }
});

// the cards showing
//var showCards = [];

// the card deck
var myDeck = [];

// the collection of favorite cards
var myCollection = [];

var heroType = 0;

var progressBars = [];

//get the cards working
 this.Filter = function(rCards) {

  var filteredCards =[];
  for(var j=0;j<rCards.length;j++){
    if(rCards[j].type!="Hero"&&
      rCards[j].type!="Enchantment"&&
      rCards[j].type!="Hero Power"&&
      rCards[j].cardId!="hexfrog"&&
      rCards[j].cardSet!="Karazhan"&&
      rCards[j].cardSet!="Debug"&&
      rCards[j].cardSet!="Credits"&&
      rCards[j].cardSet!="Journey to Un'Goro"&&
      rCards[j].cardSet!="Tavern Brawl"){

      filteredCards.push(rCards[j])
    }
  } 
  return filteredCards;
 }

//set showing cards

// this.SetCards = function(cards) {
//   showCards = cards;
// }

// this.GetCards = function() {
//   return showCards;
// }

//cost, attack, health and durability filters 
  this.CostFilter = function(cost,cards) {

  var resultCards=[];

    if(cost===8){resultCards=cards}
    else if(cost===7){
      for (var i=0;i<cards.length;i++){
          if (cards[i].cost===7||
            cards[i].cost===8||
            cards[i].cost===9||
            cards[i].cost===10||
            cards[i].cost===11||
            cards[i].cost===12){
            resultCards.push(cards[i]);
          }
        };
    }
    else{
        for (var i=0;i<cards.length;i++){

          if (cards[i].cost===cost){
            resultCards.push(cards[i]);
          }
        };
    }
  return resultCards;
}

  this.AttackFilter = function(attack,cards) {

  var resultCards=[];

    if(attack===8){resultCards=cards}
    else if(attack===7){
      for (var i=0;i<cards.length;i++){
          if (cards[i].attack===7||
            cards[i].attack===8||
            cards[i].attack===9||
            cards[i].attack===10||
            cards[i].attack===11||
            cards[i].attack===12){
            resultCards.push(cards[i]);
          }
        };
    }
    else{
        for (var i=0;i<cards.length;i++){

          if (cards[i].attack===attack){
            resultCards.push(cards[i]);
          }
        };
    }
  return resultCards;
}

  this.HealthFilter = function(health,cards) {

  var resultCards=[];

    if(health===8){resultCards=cards}
    else if(health===7){
      for (var i=0;i<cards.length;i++){
          if (cards[i].health===7||
            cards[i].health===8||
            cards[i].health===9||
            cards[i].health===10||
            cards[i].health===11||
            cards[i].health===12){
            resultCards.push(cards[i]);
          }
        };
    }
    else{
        for (var i=0;i<cards.length;i++){

          if (cards[i].health===health){
            resultCards.push(cards[i]);
          }
        };
    }
  return resultCards;
}

  this.DurabilityFilter = function(durability,cards) {

  var resultCards=[];

    if(durability===8){resultCards=cards}
    else if(durability===7){
      for (var i=0;i<cards.length;i++){
          if (cards[i].durability===7||
            cards[i].durability===8||
            cards[i].durability===9||
            cards[i].durability===10||
            cards[i].durability===11||
            cards[i].durability===12){
            resultCards.push(cards[i]);
          }
        };
    }
    else{
        for (var i=0;i<cards.length;i++){

          if (cards[i].durability===durability){
            resultCards.push(cards[i]);
          }
        };
    }
  return resultCards;
}

 //about card deck
 //set hero type for deck function
this.SetHero = function(type){
    heroType = type;
    myDeck = [];
 }

 this.GetHero = function(){
    return heroType;
 }

 this.AddCardToDeck = function(card){
  var cardAlreadyInDeck = false;
  var sameCard = 0;
  console.log(myDeck.length);

      if(myDeck.length>=30){
        cardAlreadyInDeck = true;
      }


      for (var i=0;i<myDeck.length;i++) {
      
       //see if there are already 2 same cards
        if (myDeck[i].cardId === card.cardId) {
          for(var j=i+1;j<myDeck.length;j++){
            if (myDeck[j].cardId === card.cardId){
              cardAlreadyInDeck = true;
            }
          }
            
        }
      } console.log(cardAlreadyInDeck);
      //add to deck
      if (cardAlreadyInDeck === false) {
          
          myDeck.push(card);
          //this.updateCookies();       
      } 
    //  this.SetProgress();   
 }
 
 

 this.DeleteCardFromDeck = function(id){
  for(var i=0; i<myDeck.length; i++){
            if(myDeck[i].cardId == id) {
              myDeck.splice(i,1);
              //this.updateCookies();
                break;
            }
        }
   //     this.SetProgress();
 }
 
  this.ShowProgress= function(flag){
  console.log(flag);
  return flag;
 }

 this.GetDeck = function() {
   return myDeck;
 }

//sort the cards in deck by cost
this.SortCards = function(){
  var sortedCards = [];
  var tmp = [];
  sortedCards = myDeck;
  var j=0;

  for (var i=0; i<sortedCards.length; i++) {
    console.log(i);

    for (var j=sortedCards.length-1;j>i;j--){

      if(sortedCards[j].cost<sortedCards[j-1].cost){
        tmp = sortedCards[j];
        sortedCards[j] = sortedCards[j-1];
        sortedCards[j-1] = tmp;
        console.log(j);

      }
    } 

  }
  console.log(sortedCards);
  myDeck = sortedCards;
  return myDeck;

 }

//进度条
 this.SetProgress = function(){
      //progressBars = [];

      var x=[0,0,0,0,0,0,0,0];

      for (var j=0;j<myDeck.length;j++){
          switch(myDeck[j].cost){
            case 0:
              x[0]=x[0]+1;
              break;
            case 1:
              x[1]=x[1]+1;
              break;
            case 2:
              x[2]=x[2]+1;
              break;
            case 3:
              x[3]=x[3]+1;
              break;
            case 4:
              x[4]=x[4]+1;
              break;
            case 5:
              x[5]=x[5]+1;
              break;
            case 6:
              x[6]=x[6]+1;
              break;
            default:
              x[7]=x[7]+1;
          }
          
        };

      for(var i=0;i<=7;i++){
       // progressBars.push((x[i]/myDeck.length)*60+'%');
      
        progressBars[i] = ((x[i]/myDeck.length)*100+'%');
      };
      
        //console.log(progressBars);
    }

 this.GetProgress = function(){
   console.log(progressBars);
   return progressBars;
 }

 //about collections
 this.AddCardToCollection = function(card) {
     var cardAlreadyInCol = false;

      for (key in myCollection) {
        var cardInCol = myCollection[key];
       //see if there are already 2 same cards
        if (cardInCol.cardId === card.cardId) {
            cardAlreadyInCol = true;
          }
        }
      
      //add to deck
      if (myCollection.length === 0 || cardAlreadyInCol === false) {
          
          myCollection.push(card);
          //this.updateCookies();       
      }  
      console.log(myCollection);
 
}

 this.DeleteCardFromCollection = function(id){
    for(var i=0; i<myCollection.length; i++){
            if(myCollection[i].cardId == id) {
              myCollection.splice(i,1);
              //this.updateCookies();
                break;
            }
        }
 }
 

 this.GetCollection = function(){
  return myCollection;
 }

  return this;

});

 
