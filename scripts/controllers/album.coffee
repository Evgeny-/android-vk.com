App.controller 'AlbumController', ['$scope', 'Album', '$routeParams', 'Loader', 'PhotosView',
   ($scope, Album, $routeParams, Loader, PhotosView) ->
      # variables
      albumId = $routeParams.id

      # scope variables
      $scope.images = []

      # scope methods
      $scope.openPhoto = (id) ->
         id = getImageId id
         PhotosView.open $scope.images, id if typeof id isnt "undefined"

      # functions
      loadAlbum = ->
         Album.get albumId, (res) ->
            Loader.hide()
            $scope.images = res
            $scope.$watchCollection('images', ->)()

      getImageId = (id) ->
         for image, i in $scope.images
            return i if image.id is id

      # start app
      Loader.show()
      loadAlbum()
]