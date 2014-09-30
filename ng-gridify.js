"use strict";
/*
 author: Ryan Angeles
 title: gridify
 description: responsive grids
*/
angular.module('gridify', []).
directive('gridify',[
    '$window',
    '$compile',
    '$timeout',
    function ($window, $compile, $timeout){
        return {
            restrict: "EA",
            scope: {
                items : "=gridify",
                gridifyGutter: "=?",       
                gridifyColMaxWidth: "=?",
                gridifyTemplate : "=?",
                gridifyTemplateUrl : "=?"
            },
            controller: function($scope){
                this.gutter = $scope.gridifyGutter || 10
                this.col_max_width = $scope.gridifyColMaxWidth || 200
                this.template_url = $scope.gridifyTemplateUrl
                if (typeof $scope.gridifyTemplate == 'undefined'){
                    this.template =  '<div class="gridy-box item" ng-repeat="item in items track by $index" ng-model="item">{{item}}</div>'
                }
                this.columnWidth = 0;
                this.columnCount = 0;
                this.items = [];
                
            },
            template: '<div gridy-cols ng-repeat="column in columns() track by $index" gridy-index="column"></div>',
            link: function (scope, element, attrs, ctrl){
                element.addClass("clearfix");
                $window = angular.element($window);
                ctrl.items = scope.items || []

                if (ctrl.columnCount < 1){ prepColumns(); }
                
                scope.columns = function (){
                    var range = [];
                    for (var i=0; i<ctrl.columnCount; i++){
                        range.push(i);
                    }
                    return range;
                };

                function prepColumns (){
                    ctrl.columnCount = Math.floor(element.width() / ctrl.col_max_width);
                    if (ctrl.columnCount < 1) { ctrl.columnCount = 1; }
                    var diff = (element.width() - (ctrl.columnCount * ctrl.col_max_width) - ctrl.gutter) / ctrl.columnCount;
                    ctrl.columnWidth = (ctrl.col_max_width + diff) / element.width() * 100;

                    $timeout(function(){ scope.$apply();}, 0);
                };

                var timer;
                $window.bind('resize', function(e){
                    timer && clearTimeout(timer);
                    timer = setTimeout(prepColumns, 150);
                    
                });
            }
        }
    }
]).directive('gridyCols', [
    "$http",
    "$templateCache",
    "$compile",
    function ($http, $templateCache, $compile){
        return{
            restrict: "A",
            scope:{
                index: "=gridyIndex"
            },
            require: '^gridify',
            link: function(scope, element, attrs, ctrl){
                element.
                addClass('gridyCols').
                css({
                    'padding-left': ctrl.gutter,
                    'padding-bottom': ctrl.gutter,
                    'float': 'left',
                    '-webkit-box-sizing': 'border-box',
                    '-moz-box-sizing': 'border-box',
                    '-o-box-sizing': 'border-box',
                    'box-sizing': 'border-box'
                });

                scope.items = [];
                scope.$watch(function(){
                    return ctrl.items.length
                }, function(value){ 
                    updateItems(); 
                });

                scope.$watch(function(){
                    return ctrl.columnWidth;

                }, function(new_width, old_width){
                    element.css({
                        'width' : ctrl.columnWidth + "%"
                    });
                    updateItems();
                });

                if (typeof ctrl.template_url != 'undefined'){
                    $http.get(ctrl.template_url, {cache: $templateCache}).
                    success(function(tplContent){
                       element.html($compile(tplContent.trim())(scope));
                    }).
                    error(function(data, status, headers, config) {
                        element.html($compile( ctrl.template)(scope));
                    });
                }else{
                    element.html($compile( ctrl.template)(scope));
                }
                
                function updateItems(){
                    scope.items.length = 0;
                    for (var i=scope.index; i<ctrl.items.length; i+=ctrl.columnCount){
                        scope.items.push(ctrl.items[i]);
                    }
                };
                
            }
        }
    }
]).directive('gridyBox', [
    function (){
        return{
            restrict: "C",
            scope:true,
            require: "^gridify",
            link: function(scope, element, attrs, ctrl){
                element.css({
                    'marginBottom': ctrl.gutter,
                    'zoom': '1'
                }).
                find('img, object, embed, iframe').css({
                    'width':    "100%",
                    'height': 'auto',
                    'display': 'block',
                    'margin-left': 'auto',
                    'margin-right': 'auto'
                });
            }
        }
    }
]);
