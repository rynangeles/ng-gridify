var openBeer = angular.module('openBeerApp',[
	'ui.router', 
    'ngResource',
    'beerController',
	'unliScroll',
	'gridify'
]);

openBeer.constant('BASE_URL','/ng-gridify');

openBeer.config([
    '$urlRouterProvider',
    '$stateProvider',
    'BASE_URL',
    function($urlRouterProvider, $stateProvider, BASE_URL){
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('beer',{
            url: '/',
            templateUrl: BASE_URL + '/assets/javascripts/app/partials/beers.html',
            controller: 'BeerCtrl'
        });

        $stateProvider.state('beer.dynamic',{
            url: 'dynamic',
            templateUrl: BASE_URL + '/assets/javascripts/app/partials/beers.html',
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