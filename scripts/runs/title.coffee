App.run ['$location', '$rootScope', 'Counter', ($location, $rootScope, Counter) ->
   $rootScope.$on '$routeChangeStart', (e, c) ->
      $rootScope.PAGE_TITLE = c.$$route.title if c.$$route and c.$$route.title
      $rootScope.BACK_BUTTON = !(c.$$route.disableBack or no)
      $rootScope.SHOW_HEADER = !(c.$$route.disableMenu or no)
      $rootScope.PAGE_NAME = c.$$route.name or null
      Counter.clear c.$$route.counter if c.$$route.counter?
      window.scrollTo 0, 0
]