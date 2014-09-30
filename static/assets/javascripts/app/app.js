var openBeer = angular.module('openBeerApp',[
	'ui.router', 
    'ngResource',
    'beerController',
	'unliScroll',
	'gridify'
]);

openBeer.config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('beer',{
            url: '/?dynamic',
            templateUrl: '/assets/javascripts/app/partials/beers.html',
            controller: 'BeerCtrl'
        });
    }
]);

openBeer.factory('BeerService',[
    '$resource',
    function ($resource){
        return $resource('/open_beer', {});

    }
]);