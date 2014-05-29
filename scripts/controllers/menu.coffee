App.controller "MenuController", ['$scope', '$rootScope', 'Menu', '$location', 'GROUP_OPTIONS', 'PhotosView', 'Counter',
   ($scope, $rootScope, Menu, $location, GROUP_OPTIONS, PhotosView, Counter) ->
      $rootScope.openedMenu = false

      $scope.info = GROUP_OPTIONS
      $scope.new = null

      $rootScope.openPage = (url) ->
         $rootScope.hideMenu()
         $location.path url

      $rootScope.showMenu = ->
         return if PhotosView.opened()
         $rootScope.openedMenu = true
         disableScroll()

      $rootScope.hideMenu = ->
         return if PhotosView.opened()
         $rootScope.openedMenu = false
         enableScroll()

      preventDef = (e) ->
         e.preventDefault()

      updateCounters = ->
         $scope.new = Counter.getCountAll()
         for key, value of $scope.new
            $scope.new[key] = '99+' if value > 99

      disableScroll = ->
         document.addEventListener 'ontouchstart', preventDef, false
         document.addEventListener 'ontouchmove', preventDef, false
         window.addEventListener 'DOMMouseScroll', preventDef, false

      enableScroll = ->
         document.removeEventListener 'ontouchstart', preventDef, false
         document.removeEventListener 'ontouchmove', preventDef, false
         window.removeEventListener 'DOMMouseScroll', preventDef, false

      Menu.on "open", $rootScope.showMenu
      Menu.on "close", $rootScope.hideMenu

      Counter.onChange updateCounters
      updateCounters()
]