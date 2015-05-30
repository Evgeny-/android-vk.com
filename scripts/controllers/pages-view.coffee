App.controller 'PagesViewController', ['$scope', '$rootScope', 'PagesView', 'Page',
  ($scope, $rootScope, PagesView, Page) ->
    $scope.title = null
    $scope.html = null

    $scope.closePage = -> PagesView.close()

    $rootScope.$on 'Page:open', (e, title, url) ->
      $scope.url = url
      $scope.title = title
      $scope.html = null

    $rootScope.$on 'Page:close', ->
      $scope.url = null
      $scope.title = null
      $scope.html = null

]