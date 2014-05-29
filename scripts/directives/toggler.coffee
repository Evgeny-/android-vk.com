App.directive 'switcher', ->
   restrict: "EA"
   replace: true
   scope:
      model: "="
      onLabel: "@"
      offLabel: "@"

   template: "
      <div class=\"switch\" ng-click=\"toggle()\">
         <div ng-class=\"{'switch-off': !model, 'switch-on': model}\">
            <span class=\"switch-left\">Да</span>
            <span class=\"knob\">&nbsp;</span>
            <span class=\"switch-right\">Нет</span>
         </div>
      </div>
   "
   link: ($scope, element, attrs) ->
      $scope.toggle = ->
         element.children().addClass "switch-animate"
         $scope.model = not $scope.model