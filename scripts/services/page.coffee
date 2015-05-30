App.service 'Page', ['VKApi', 'OPTIONS', class
  # @private
  options = {}

  # @private
  parseResult = (callback) ->
    (res) ->
      console.log res
  # @public
  constructor: (@VKApi, OPTIONS, Settings) ->
    options = OPTIONS

  # @public
  get: (page, callback) ->
    @VKApi.get 'pages.get', {
      owner_id: options.id
      page_id: page
      need_html: 1
    }, parseResult callback
]