App.service 'Loader', ['$rootScope', '$timeout', class
   showed = false
   time = 0
   title = null
   constructor: (@$rootScope, @$timeout) ->
   isShowed: -> showed

   show: (pos='top') ->
      title = @$rootScope.PAGE_TITLE
      showed = true
      time = + new Date
      @$rootScope.PAGE_TITLE = '<span>Загрузка <i class="icon-loader animate-spin"></i></span>'
      #@$rootScope.$broadcast 'loader:show', pos

   hide: (minloadtime=0) ->
      now = + new Date
      if(now < time + minloadtime)
         @$timeout @_hide.bind(@), minloadtime - (now - time)
      else @_hide()

   _hide: ->
      showed = false
      @$rootScope.PAGE_TITLE = title
      #@$rootScope.$broadcast 'loader:hide'
      time = + new Date
]