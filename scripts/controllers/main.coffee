App.controller 'MainController', ['$scope', 'GROUP_OPTIONS', 'Counter',
   ($scope, GROUP_OPTIONS, Counter) ->
      $scope.info = GROUP_OPTIONS
      $scope.count = null

      updateCounters = ->
         $scope.count = Counter.getCountAll()
         for key, value of $scope.count
            $scope.count[key] = '9+' if value > 9

      Counter.onChange updateCounters
      updateCounters()
]