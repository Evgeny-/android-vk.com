App.run ['Group', 'GROUP_OPTIONS', (Group, GROUP_OPTIONS) ->
   Group.get (res) ->
      GROUP_OPTIONS.name = res.name unless GROUP_OPTIONS.name isnt null
      GROUP_OPTIONS.image = res.photo_100 unless GROUP_OPTIONS.image isnt null
      GROUP_OPTIONS.status = res.status unless GROUP_OPTIONS.status isnt null
]