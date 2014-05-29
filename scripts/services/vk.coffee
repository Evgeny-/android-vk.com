App.service 'VKApi', ['$http', class
   # @private
   url = 'https://api.vk.com/method/'

   # @private
   serialize = (obj) ->
      result = "?"
      for key, value of obj
         result += "#{key}=#{value}&"
      result

   # @public
   constructor: (@$http) ->
      @$http.defaults.cache = true

   # @public
   get: (method, options, callback) ->
      link = url + method + serialize(options) + 'v=5.4&callback=JSON_CALLBACK'
      @$http.jsonp(link, cache: true).success callback
]