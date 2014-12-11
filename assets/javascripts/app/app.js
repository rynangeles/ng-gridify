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
            url: '/',
            templateUrl: '/assets/javascripts/app/partials/beers.html',
            controller: 'BeerCtrl'
        });

        $stateProvider.state('beer.dynamic',{
            url: 'dynamic',
            templateUrl: '/assets/javascripts/app/partials/beers.html',
            controller: 'BeerCtrl'
        });
    }
]);

openBeer.factory('BeerService',[
    '$resource',
    function ($resource){
        return $resource('http://api.openbeerdatabase.com/v1/beers.json', {
            callback : 'JSON_CALLBACK'
        },{
            getBeers: {
                method : "JSONP",
                isArray: true,
                transformResponse: function(data, header){
                    return data.beers;
                }
            }
        });
    }
]);

openBeer.run([
    '$rootScope', 
    '$location', 
    function ($rootScope, $location) {
        $rootScope.$on('$stateChangeSuccess', function (e, current) {
            $rootScope.dynamicContent = current.name === 'beer.dynamic';
        });
    }
]);