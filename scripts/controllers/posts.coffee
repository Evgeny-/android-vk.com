App.controller 'PostsController', ['$scope', 'Posts', 'Loader', 'Store', 'PhotosView',
   ($scope, Posts, Loader, Store, PhotosView) ->
      # vars
      page = 0
      canLoad = true
      win = angular.element window
      liked = Store.get('liked') or []
      isSavedPage = location.hash.indexOf('saved') isnt -1

      # scope vars
      $scope.posts = []
      $scope.isSavedPage = isSavedPage
      $scope.sortBy = if isSavedPage then 'likePost' else 'id'

      # scope methods
      $scope.likePost = (post) ->
         post.isLiked = not post.isLiked
         unless post.isLiked
            liked = liked.filter (p) -> p.id isnt post.id
         else
            post.likePost = + new Date
            liked.push post
         Store.set 'liked', liked

      $scope.isLiked = (id) ->
         for post in liked
            return true if id is post.id
         false

      $scope.openLink = (url) ->
         window.open url, '_system'

      $scope.openImage = (post, id) ->
         PhotosView.openPostPhotos post, id

      # functions
      loadMorePosts = ->
         canLoad = false
         Loader.show()
         Posts.get page++, (posts) ->
            Loader.hide()
            insertPosts posts
            canLoad = true

      insertPosts = (posts) ->
         for post in posts
            $scope.posts.push post unless existPost post.id

      existPost = (id) ->
         for post in $scope.posts
            return true if post.id is id
         false

      onScroll = ->
         return unless canLoad
         docHeight = document.getElementById("posts").clientHeight
         if (docHeight - window.innerHeight - window.pageYOffset) < 1000
            loadMorePosts()
            $scope.$apply()

      # start controller
      if isSavedPage
         $scope.posts = Store.get('liked') or []
      else
         loadMorePosts()
         win.bind 'scroll', onScroll
         $scope.$on '$destroy', ->
            win.unbind 'scroll', onScroll




]