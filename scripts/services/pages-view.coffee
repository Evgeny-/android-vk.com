App.service 'PagesView', ['$rootScope', class
  open = false

  constructor: (@$rootScope) ->

  openPage: (title, url) ->
    open = true
    @$rootScope.$emit 'Page:open', title, url

  close: ->
    open = false
    @$rootScope.$emit 'Page:close', null

  opened: -> open
]