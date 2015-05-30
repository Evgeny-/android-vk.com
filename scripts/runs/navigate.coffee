App.run ['$location', '$rootScope', 'PhotosView', ($location, $rootScope, PhotosView) ->
   $rootScope.$go = go: (url) -> $location.path url
   $rootScope.openPhoto = PhotosView.open
   $rootScope.BACK_BUTTON = true
   $rootScope.openMail = (email) ->
     window.open "mailto:#{email}", "_system"
]