App.filter "showMore", ->
   (count) ->
      word = switch
         when count is 1 then 'изображение'
         when [2,3,4].indexOf(count) isnt -1 then 'изображения'
         else 'изображений'

      "Показать еще #{count} #{word}"
