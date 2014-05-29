App.service 'PhotosView', ['$rootScope', class
   open = false

   getId = (images, id) ->
      for img, i in images
         return i if img.id is id

   formatImage = (image) ->
      id: image.id
      desc: image.text
      image_big: image.src
      image_small: image.src
      ratio: image.width / image.height

   constructor: (@$rootScope) ->

   openPostPhotos: (post, id) ->
      images = post.images.concat post.imagesMore
      images = images.map formatImage
      @open images, getId(images, id) or 0

   open: (images, id) ->
      open = true
      @$rootScope.$emit 'Photo:open', images, id

   close: ->
      open = false
      @$rootScope.$emit 'Photo:close', null

   opened: -> open
]