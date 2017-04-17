
var hearthStoneApp = angular.module('hearthStone', ['ngRoute','ngResource']);

hearthStoneApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
      }).
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/card/:cardId', {
        templateUrl: 'partials/card.html',
      //  controller: 'CardCtrl'
      }).
      when('/setHero', {
        templateUrl: 'partials/setHero.html',
       controller:'MainCtrl'
      }).
      when('/deck', {
        templateUrl: 'partials/deck.html',
        controller:'DeckCtrl'
      }).      
      when('/deckOverview', {
        templateUrl: 'partials/deckOverview.html',
      //  controller: 'CardCtrl'
      }).
      when('/collection', {
        templateUrl: 'partials/collection.html',
        controller: 'CollectionCtrl'  
      }). 
      
      otherwise({
        redirectTo: '/home'
      });
  }]);