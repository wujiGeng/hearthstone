

hearthStoneApp.factory('Hearthstone',function ($resource,$cookieStore) {
  

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
var self = this;
// the card deck
var myDeck = [];

// the collection of favorite cards
var myCollection = [];

var heroType = 0;

var progressBars = [];


//get the cards working
this.getDeckFromCookie = function(cookieValue) {
  console.log(cookieValue);
    for (var i = 0; i < cookieValue.length; i++) {
        self.Card.query({name:cookieValue[i]},function(data){
          self.AddCardToDeck(data[0]);
      }, function(){
        alert("Data retrival was faulty");
        }
      )
    }
  }

  this.getFavFromCookie = function(cookieValue) {
  console.log(cookieValue);
    for (var i = 0; i < cookieValue.length; i++) {
        self.Card.query({name:cookieValue[i]},function(data){
          self.AddCardToCollection(data[0]);
          console.log(222222);
      }, function(){
        alert("Data retrival was faulty");
        console.log(11111);
        }
      )
    }
  }

 /* this.getFavFromCookie = function(cookieValue) {
    for (var i = 0; i < cookieValue.length; i++) {
        self.Card.get({cardId:cookieValue[i]},function(data){
          self.AddCardToDeck(data);
      }, function(){
        alert("Data retrival was faulty");
        }
      )
    }
  }*/

    //Load from cookie if there is one or initialized to 0 the number of guest
  if ($cookieStore.get('myCollection') != undefined) {
    this.getFavFromCookie($cookieStore.get('myCollection'));
        console.log(myCollection);
  } else {
    this.myCollection = [];

  }

  // Load from cookir if there is one or initialized to empty list the selected menu
 if ($cookieStore.get('heroType') != undefined) {
    heroType = $cookieStore.get('heroType');
        console.log(heroType);
  } else {
    this.heroType = 0;

  }



  if ($cookieStore.get('myDeck') != undefined) {
    this.getDeckFromCookie($cookieStore.get('myDeck'));
/*    this.myDeck = [];*/
  } else {
    this.myDeck = [];
  }

  this.getMenuIds = function() {
    var ids = []
    for (var i = 0; i < myDeck.length; i++) {
      ids.push(myDeck[i].cardId);
    }
    return ids;
  } 
  this.getFavIds = function() {
    var ids = []
    for (var i = 0; i < myCollection.length; i++) {
      ids.push(myCollection[i].cardId);
    }
    return ids;
  } 

  this.updateCookies = function() {
    $cookieStore.put('heroType', heroType);

    $cookieStore.put('myDeck', this.getMenuIds());
    $cookieStore.put('myCollection', this.getFavIds());

  }

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

//turn pages
 this.PageDown = function(page,s){
    page=page-1; 
    if(page<=0){page=1}
    var showingCards =[];
    var shownCards = s;
    for(var j=page*10-10;j<page*10;j++){
      showingCards.push(shownCards[j])
    };
    return showingCards;
 }

 this.PageUp = function(page,s){
    page=page+1;
    var showingCards =[];
    var shownCards = s;
    for(var j=(page-1)*10;j<page*10;j++){
      showingCards.push(shownCards[j])
    }; 
       if(page*10>=shownCards.length){page=parseInt(shownCards.length/10+1)};
       return showingCards;
 }



 //about card deck
 //set hero type for deck function
this.SetHero = function(type){
    heroType = type;
    myDeck = [];
    this.updateCookies();
 }

 this.GetHero = function(){
    return heroType;
 }
 
 this.GetHeroPic=function(){
  var link = "";

    if(heroType=='Warrior'){
      link = "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_01.png"
    }
    if(heroType=='Shaman'){
      link = "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_02.png"
    }
    if(heroType=='Rogue'){
      link = "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_03.png"
    }
    if(heroType=='Paladin'){
      link = "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_04.png"
    }
    if(heroType=='Hunter'){
      link = "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_05.png"
    }
    if(heroType=='Druid'){
      link = "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_06.png"
    }
    if(heroType=='Warlock'){
      link = "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_07.png"
    }
    if(heroType=='Priest'){
      link = "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_08.png"
    }
    if(heroType=='Mage'){
      link = "http://media.services.zam.com/v1/media/byName/hs/cards/enus/HERO_09.png"
    }
    console.log(link);
    return link;
    
 }

 this.AddCardToDeck = function(card){
  var cardAlreadyInDeck = false;
  var sameCard = 0;

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
      this.updateCookies();
    //  this.SetProgress();   
 }
 
 

 this.DeleteCardFromDeck = function(id){
  for(var i=0; i<myDeck.length; i++){
            if(myDeck[i].cardId == id) {
              myDeck.splice(i,1);
              this.updateCookies();
                break;
            }
        }

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
          this.updateCookies();       
      }  
      console.log(myCollection);
      this.updateCookies();
 
}

 this.DeleteCardFromCollection = function(id){
    for(var i=0; i<myCollection.length; i++){
            if(myCollection[i].cardId == id) {
              myCollection.splice(i,1);
              this.updateCookies();
                break;
            }
        }

 }
 

 this.GetCollection = function(){
  return myCollection;
 }

  return this;

});

 
