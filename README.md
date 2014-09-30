Gridify Directive
====

Attributes:

gridify : accepts array data to be displayed in resposive grid
gridifyGutter : padding on all side of each grid. default is 10
gridifyColMaxWidth : maximum width to determine when to add or subtract columns. default is 200
gridifyTemplate : html element as string that will be used by each gridbox where ng-repeat uses items model. default is <div class="gridy-box item" ng-repeat="item in items track by $index" ng-model="item">{{item}}</div>
gridifyTemplateUrl : when added gridifyTemplate will be a fallback. Syntax in gridyTemplate must be followed.
