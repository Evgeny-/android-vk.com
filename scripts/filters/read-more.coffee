App.filter "readMore", ->
   LEN = 300
   (text) ->
      return [text, null] if text.length < LEN + 50
      words = text.replace('.\n', '. \n').split ". "
      result = ""
      spell = 0
      while result.length < LEN
         result += words[spell++] + ". "
      other = text.slice result.length
      if other.length < 50 then [result + other, null] else [result, other]
