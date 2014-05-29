App.service "Menu", [class
   opened = false
   callbacks = open: [], close: []

   fire = (type) ->
      callbacks[type].forEach (callback) ->
         callback.call null

   open: ->
      opened = true
      fire "open"

   close: ->
      opened = true
      fire "close"

   on: (type, callback) -> callbacks[type].push callback

   isOpen: -> opened
]