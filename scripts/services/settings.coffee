App.service 'Settings', ['Store', 'OPTIONS', class
   _options: {}

   _save: -> @Store.set 'options', @_options

   constructor: (@Store, @OPTIONS) ->
      @_options = Store.get('options') or OPTIONS

   get: (key) -> @_options[key]

   set: (key, value) ->
      @_options[key] = value
      @_save()
]