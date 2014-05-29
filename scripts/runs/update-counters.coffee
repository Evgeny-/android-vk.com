App.run ['Posts', 'Albums', 'Settings', (Posts, Albums, Settings) ->
   update = ->
      return unless Settings.get 'autoUpdate'
      Posts.updateCache()
      Albums.updateCache()

   setInterval update, Settings.get 'updatePer'
   update()
]