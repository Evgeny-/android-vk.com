App.run ['Menu', 'PhotosView', (Menu, PhotosView) ->
   document.addEventListener 'deviceready', (->
      document.addEventListener 'menubutton', (e) ->
         if Menu.isOpen() then Menu.hide() else Menu.show()
         e.preventDefault()
         false

      document.addEventListener 'backbutton', (e) ->
         if PhotosView.opened()
            PhotosView.close()
            e.preventDefault()
            return false
         else if Menu.isOpen()
            Menu.hide()
            e.preventDefault()
            return false
         true
   ), false
]