App.service 'Posts', ['VKApi', 'OPTIONS', 'Counter', 'Settings', class
   # @private
   store = null
   settings = null
   options = {}
   liked = []

   # @private
   parseResult = (callback) ->
      (res) ->
         if res.response?.items
            parsePosts res.response.items, callback
         else
            parseError res.error, callback

   # @private
   parsePosts = (posts, callback) ->
      posts = posts.map (post) ->
         parsePost post

      callback posts.filter (post) ->
         isValid post

   # @private
   parsePost = (post) ->
      parsedPost =
         id: post.id
         type: post.post_type
         text: parseText post.text
         likes: post.likes?.count
         reposts: post.reposts?.count
         date: post.date
         images: []
         imagesMore: []
         gifs: []
         videos: []
         files: []

      post.attachments?.forEach (attach) =>
         if attach.type is 'photo'
            photo = attach.photo
            insertTo = if parsedPost.images.length < options.maxImages then 'images' else 'imagesMore'
            parsedPost[insertTo].push
               id: photo.id
               src: if settings.get('highRes') then (photo.photo_807 or photo.photo_604) else photo.photo_604
               text: attachPhotoText photo.text
               height: photo.height
               width: photo.width

         else if attach.type is 'video'
            parsedPost.videos.push
               id: attach.video.id
               title: attach.video.title
               photo: attach.video.photo_320

         else if attach.type is 'doc'
            if attach.doc.ext is 'gif'
               parsedPost.gifs.push
                  src: attach.doc.url
                  photo: attach.doc.photo_130
            else
               parsedPost.files.push
                  url: attach.doc.url
                  title: attach.doc.title
                  size: attach.doc.size

      parsedPost

   # @private
   attachPhotoText = (text) ->
      if text.indexOf('Original:') isnt 0 then text else ''

   # @private
   isValid = (post) ->
      post.type isnt 'copy' and
      (post.text.length > 30 or
      post.images.length or
      post.videos.length or
      post.gifs.length)

   # @private
   parseText = (text) ->
      text = replaceLinks text
      text.replace /\[(.*)\|(.*)\]/gi, '<a class="link" onclick="window.open(\'http://vk.com/$1\', \'_system\')">$2</a>'

   # @private
   replaceLinks = (text) ->
      pattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
      text.replace pattern1, (match) ->
         url = match.split '/'
         "<a class=\"link\" onclick=\"window.open(\'#{match}\', \'_system\')\">#{url[2]}</a>"

   # @private
   parseError = (error, callback) ->
      callback error: error

   # @public
   constructor: (@VKApi, OPTIONS, @Counter, Settings) ->
      options = OPTIONS
      settings = Settings

   # @public
   get: (page, callback) ->
      @VKApi.get 'wall.get', {
         owner_id: options.id
         offset: page * options.postsPerOnce
         count: options.postsPerOnce
      }, parseResult callback

   updateCache: ->
      newPosts = 0
      counter = @Counter.get 'posts'
      @get 0, (posts) =>
         return @Counter.add 'posts', 0, posts[0].id if counter.last is null
         posts.forEach (post) ->
            newPosts++ if post.id > counter.last
         @Counter.add 'posts', newPosts, posts[0].id if newPosts

]