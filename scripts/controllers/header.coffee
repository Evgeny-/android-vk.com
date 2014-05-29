App.controller 'HeaderController', ['$scope', '$location', 'Menu',
   ($scope, $location, Menu) ->
      $scope.goBack = ->
         history.back()

      $scope.openMenu = ->
         Menu.open()
]