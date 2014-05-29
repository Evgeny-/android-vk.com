App.controller 'PhotosViewController', ['$scope', '$rootScope', 'PhotosView',
   ($scope, $rootScope, PhotosView) ->
      $scope.images = null
      $scope.id = null
      $scope.loading = true

      $scope.closePhotos = -> PhotosView.close()

      $scope.nextPhoto = ->
         if $scope.id + 1 < $scope.images.length then $scope.id++ else $scope.id = 0
         $scope.loading = true

      $scope.prevPhoto = ->
         if $scope.id > 0 then $scope.id-- else $scope.id = $scope.images.length - 1
         $scope.loading = true

      $scope.loaded = ->
         $scope.loading = false

      $rootScope.$on 'Photo:open', (e, images, id) ->
         $scope.images = images
         $scope.id = +id
         $scope.loading = true

      $rootScope.$on 'Photo:close', ->
         $scope.images = null
         $scope.id = null
         $scope.loading = false
]