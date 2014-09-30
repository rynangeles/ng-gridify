angular.module('beerController', []).
factory('beerFeed',[
	'BeerService',
	function (BeerService){
		return {
            beers : [],
            per_page: 20,
            page: 1,
            nextPageFeed: function (){
                var self = this;
                if (self.busy) return;
                if(self.empty) return;

                self.busy = true;
                BeerService.query({
                	page: self.page,
                	per_page: self.per_page
                }).$promise.then(function(data){
                	angular.forEach(data, function (v, i){
                		self.beers.push(v);
                	});
					self.busy = false;
					self.page++;
				});                
            }
        }
	}
]).
controller('BeerCtrl',[
	'$scope',
	'$stateParams',
	'beerFeed',
	function ($scope, $stateParams, beerFeed){
		$scope.dynamic = $stateParams.dynamic || false
		if ($stateParams.dynamic){
			$scope.feeds = beerFeed;
		}else{
			$scope.feeds = [{"id":31,"name":"Save Our Shore","description":"This Abita Beer is a message in a bottle...a distress signal for the troubled waters of our Gulf Coast. For every bottle sold Abita will donate 75¢ to the rescue and restoration of the environment, industry and individuals fighting to survive this disastrous oil spill. This unfiltered Weizen Pils is made with Pilsner and Wheat malts. It is hopped and dry hopped with Sterling and German Perle hops. It has a brilliant gold color, a sweet malt flavor, and a pleasant bitterness and aroma.","abv":7.0,"created_at":"2010-12-07T02:53:38Z","updated_at":"2010-12-07T02:53:38Z","brewery":{"id":4,"name":"Abita Brewing Company"}},{"id":32,"name":"Strawberry","description":"Strawberry Harvest Lager is a wheat beer made with real Louisiana strawberries, picked late in the season when they're at their sweetest. This brew has earned quite a reputation in a short time, causing the brewery to up their production year after year. When this brew is found, emails and phone calls fly to friends informing them of the store's location. Strawberry Harvest is a crisp, light lager with just a hint of strawberry sweetness. It is wonderful with desserts or lighter fares such as salads and pastas. Fresh cheeses such as Burrata, chevre, Creszenza, mozzarella or Teleme pair well with Strawberry Harvest.","abv":4.2,"created_at":"2010-12-07T02:53:38Z","updated_at":"2010-12-07T02:53:38Z","brewery":{"id":4,"name":"Abita Brewing Company"}},{"id":33,"name":"Turbodog","description":"Turbodog is a dark brown ale brewed with Willamette hops and a combination of pale, crystal and chocolate malts. This combination gives Turbodog its rich body and color and a sweet chocolate toffee-like flavor. Turbodog began as a specialty ale but has gained a huge loyal following and has become one of our flagship brews.\n\nThis ale pairs well with most meats and is great served with hamburgers or sausages. It is a good match with smoked fish and can even stand up to wild game dishes. Turbodog is also great for marinating and braising meats and cooking such things as cabbage and greens. Colby, Gloucester, Cheddar and Blue cheeses go nicely with Turbodog. It's perfect with spicy Louisiana jambalaya or Spanish paella. Some even like it paired with chocolate!","abv":5.6,"created_at":"2010-12-07T02:53:38Z","updated_at":"2010-12-07T02:53:38Z","brewery":{"id":4,"name":"Abita Brewing Company"}},{"id":34,"name":"Wheat","description":"Wheat (May – September) German brewers discovered centuries ago that the addition of wheat produces a distinctively light, refreshing beer. Unlike traditional German wheat beers produced by other breweries, Abita Wheat is a lager, not an ale, and contains a generous amount of wheat which produces a clean, simple flavor. For a change of pace, try Abita Wheat with a twist of lemon. Feta and goat cheeses pair well with Wheat beer. Great with summertime fare such as pasta and salads, but don't forget barbeque and anything right off the grill.","abv":4.2,"created_at":"2010-12-07T02:53:38Z","updated_at":"2010-12-07T02:53:38Z","brewery":{"id":4,"name":"Abita Brewing Company"}},{"id":35,"name":"Amber","description":"Based on a recipe from a turn-of-the-century brewery in the Juneau area. Richly malty and long on the palate, with just enough hop backing to make this beautiful amber colored \"alt\" style beer notably well balanced. It is made from glacier-fed water and a generous blend of the finest quality European and Pacific Northwest hop varieties and premium two-row pale and specialty malts.","abv":5.3,"created_at":"2011-05-29T03:24:18Z","updated_at":"2011-05-29T03:24:18Z","brewery":{"id":5,"name":"Alaskan Brewing Company"}},{"id":36,"name":"IPA","description":"Honey gold in color with a fruity, citrus aroma. An enticing blend of hops and our dry hopping process, in which hops are added directly to tanks during fermentation, give this brew a very intense, complex aromatic character with a refreshing hop finish.","abv":6.2,"created_at":"2011-05-29T03:24:18Z","updated_at":"2011-05-29T03:24:18Z","brewery":{"id":5,"name":"Alaskan Brewing Company"}},{"id":37,"name":"Pale","description":"A clean, softly malted body with a hint of citrus overtones, followed by a hop-accented dry, crisp finish.","abv":5.2,"created_at":"2011-05-29T03:24:18Z","updated_at":"2011-05-29T03:24:18Z","brewery":{"id":5,"name":"Alaskan Brewing Company"}},{"id":38,"name":"Smoked Porter","description":"The dark, robust body and pronounced smoky flavor of this limited edition beer make it an adventuresome taste experience. Alaskan Smoked Porter is produced in limited \"vintages\" each year on November 1st and unlike most beers, may be aged in the bottle much like fine wine.","abv":6.5,"created_at":"2011-05-29T03:24:18Z","updated_at":"2011-05-29T03:24:18Z","brewery":{"id":5,"name":"Alaskan Brewing Company"}},{"id":39,"name":"Stout","description":"The unique blend of the oats and malts produces a balanced, smooth beer with hints of coffee and caramel.","abv":5.7,"created_at":"2011-05-29T03:24:18Z","updated_at":"2011-05-29T03:24:18Z","brewery":{"id":5,"name":"Alaskan Brewing Company"}},{"id":40,"name":"Summer Ale","description":"It balances a softly malted palate with the clean freshness of hops. In the tradition of the style, neither overpowers the other. Both hops and malt come together to refresh and renew the palate.","abv":5.3,"created_at":"2011-05-29T03:24:18Z","updated_at":"2011-05-29T03:24:18Z","brewery":{"id":5,"name":"Alaskan Brewing Company"}}]
		}
		$scope.feedTemplate = "/assets/javascripts/app/partials/beer.html";
	}
])