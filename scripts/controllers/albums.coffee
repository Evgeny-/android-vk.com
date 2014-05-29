App.controller 'AlbumsController', ['$scope', 'Albums', 'Loader',
   ($scope, Albums, Loader) ->
      $scope.albums = []

      Loader.show 'top'

      Albums.get (res) ->
         Loader.hide()
         $scope.albums = res
]