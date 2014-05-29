App.service 'Album', ['VKApi', 'OPTIONS', 'Settings', class
   # @private
   options = {}
   settings = null

   # @private
   parseResult = (callback) ->
      (res) ->
         if res.response?.items
            parsePhotos res.response.items, callback
         else
            parseError res.error, callback

   # @private
   parseError = (error, callback) ->
      callback error: error

   # @private
   parsePhotos = (photos, callback) ->
      callback photos.map parsePhoto

   # @private
   parsePhoto = (photo) ->
      id: photo.id
      desc: photo.text
      image_big: if settings.get('highRes') then (photo.photo_807 or photo.photo_604) or photo.photo_604
      image_small: photo.photo_130
      ratio: photo.width / photo.height

   # @public
   constructor: (@VKApi, OPTIONS, Settings) ->
      options = OPTIONS
      settings = Settings

   # @public
   get: (album, callback) ->
      @VKApi.get 'photos.get', {
         owner_id: options.id
         album_id: album
         need_system: 1
      }, parseResult callback
]