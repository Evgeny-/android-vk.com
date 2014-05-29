App.directive 'ngOnload', ->
   (scope, el, attr) ->
      el.on 'load', ->
         scope.$apply attr.ngOnload