App.controller 'LoaderController', ['$rootScope', '$scope', ($rootScope, $scope) ->
   $scope.showed = false
   $scope.position = null

   $rootScope.$on 'loader:show', (e, pos) ->
      $scope.position = pos
      $scope.showed = true

   $rootScope.$on 'loader:hide', ->
      $scope.showed = false
      $scope.position = null
]