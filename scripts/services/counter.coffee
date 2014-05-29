App.service 'Counter', ['Store', class
   default:
      posts: last: null, count: 0
      photos: last: null, count: 0

   counters: {}
   listeners: []

   constructor: (@Store) ->
      @counters = @Store.get('counters') or @default

   _save: ->
      @Store.set 'counters', @getAll()
      @_fire()

   _fire: -> @listeners.forEach (cb) -> cb()

   onChange: (cb) -> @listeners.push cb

   add: (type, count, last) ->
      @set type, @getAll()[type].count + count, last

   set: (type, value, last) ->
      @counters[type] = count: value, last: last
      @_save()

   get: (type) -> @getAll()[type]
   getAll: -> JSON.parse JSON.stringify @counters

   getCount: (type) -> @get(type).count
   getCountAll: ->
      counters = @getAll()
      for key, value of counters
         counters[key] = value.count
      counters

   clear: (type) ->
      @counters[type].count = 0
      @_save()
]