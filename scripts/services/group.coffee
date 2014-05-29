App.service 'Group', ['VKApi', 'OPTIONS', class
   # @private
   options = {}

   # @private
   parseResult = (callback) ->
      (res) ->
         if res.response?[0]
            parseGroup res.response[0], callback
         else
            parseError res.error, callback

   # @private
   parseError = (error, callback) ->
      callback error: error

   # @private
   parseGroup = (res, callback) ->
      callback res

   # @public
   constructor: (@VKApi, OPTIONS) ->
      options = OPTIONS

   # @public
   get: (callback) ->
      @VKApi.get 'groups.getById', {
         group_id: -options.id
         fields: 'status'
      }, parseResult callback
]