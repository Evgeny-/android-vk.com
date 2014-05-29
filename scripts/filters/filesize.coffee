App.filter 'filesize', ->
   (size) ->
      size = 0  if isNaN(size)
      return size + " байт"  if size < 1024
      size /= 1024
      return size.toFixed(1) + " Кб"  if size < 1024
      size /= 1024
      return size.toFixed(1) + " Мб"  if size < 1024
      size /= 1024
      return size.toFixed(1) + " Гб"  if size < 1024
      size /= 1024
      size.toFixed(1) + " Тб"