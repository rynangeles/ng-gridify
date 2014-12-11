angular.module('unliScroll', []).
directive('unliScroll', [
    '$window',
    '$compile',
    '$timeout',
    function ($window, $compile, $timeout){
        return {
            restrict: "A",
            scope:true,
            link: function(scope, element, attrs){
                var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
                $window = angular.element($window);
                scrollDistance = 1;

                scrollEnabled = true;
                checkWhenEnabled = false;
                if (attrs.unliScrollDisabled != null) {
                    scope.$watch(attrs.unliScrollDisabled, function(value) {
                        scrollEnabled = !value;
                        if (scrollEnabled && checkWhenEnabled) {
                            checkWhenEnabled = false;
                            return handler();
                        }
                    });
                }

                if(element.find('.item').length <= 0){
                    scope.$eval(attrs.unliScroll);
                }

                scope.$watch(function(){
                    return element.height();

                }, function(value){
                    if(value < $window.height()){
                        scope.$eval(attrs.unliScroll);
                    }
                });

                var handler = function() {
                    var elementBottom, remaining, shouldScroll, windowBottom;
                    windowBottom = $window.height() + $window.scrollTop();
                    elementBottom = element.offset().top + element.height();
                    remaining = elementBottom - windowBottom;
                    shouldScroll = remaining <= $window.height() * scrollDistance;
                    if (shouldScroll && scrollEnabled) {
                        return scope.$eval(attrs.unliScroll);

                    } else if (shouldScroll) {
                        return checkWhenEnabled = true;
                    }
                };
                $window.on('scroll', handler);
                scope.$on('$destroy', function() {
                    return $window.off('scroll', handler);
                });
            }
        };
    }
]);