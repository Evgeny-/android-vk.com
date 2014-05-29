App.controller 'SettingsController', ['$scope', 'Settings',
   ($scope, Settings) ->
      $scope.config =
         autoUpdate: Settings.get 'autoUpdate'
         highRes: Settings.get 'highRes'

      $scope.$watch 'config', (->
         for key, value of $scope.config
            Settings.set key, value
      ), true
]