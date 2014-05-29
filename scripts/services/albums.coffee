App.service 'Albums', ['VKApi', 'OPTIONS', 'Counter', class
   # @private
   options = {}

   # @private
   parseResult = (callback) ->
      (res) ->
         if res.response?.items
            parseAlbums res.response.items, callback
         else
            parseError res.error, callback

   # @private
   parseError = (error, callback) ->
      callback error: error

   # @private
   parseAlbums = (albums, callback) ->
      callback albums.map parseAlbum

   # @private
   parseAlbum = (album) ->
      id: album.id
      desc: album.description
      image: album.thumb_src
      title: album.title
      count: album.size

   # @public
   constructor: (@VKApi, OPTIONS, @Counter) ->
      options = OPTIONS

   # @public
   get: (callback) ->
      @VKApi.get 'photos.getAlbums', {
         owner_id: options.id
         need_covers: 1
         need_system: 1
         count: 50
      }, parseResult callback

   updateCache: ->
      counter = @Counter.get 'photos'
      @get (albums) =>
         count = 0
         albums.forEach (album) -> count += album.count
         return @Counter.add 'photos', 0, count if counter.last is null
         diff = count - counter.last
         @Counter.add 'photos', diff, count if diff > 0
]