App.config ['$routeProvider', ($route) ->
   $route
      .when('/posts',
         templateUrl: 'views/posts.html'
         title: 'Посты'
         disableBack: yes
         counter: 'posts'
         name: 'posts'
      )
      .when('/',
         templateUrl: 'views/main.html'
         title: 'Главная страница'
         disableMenu: yes
         name: 'index'
      )
      .when('/albums',
         templateUrl: 'views/albums.html'
         title: 'Альбомы'
         counter: 'photos'
         name: 'albums'
      )
      .when('/albums/:id',
         templateUrl: 'views/album.html'
         title: 'Просмотр альбома'
         name: 'photos'
      )
      .when('/saved',
         templateUrl: 'views/posts.html'
         title: 'Сохраненные посты'
         name: 'saved'
      )
      .when('/settings',
         templateUrl: 'views/settings.html'
         title: 'Настройки'
         name: 'settings'
      )
      .otherwise redirectTo: '/posts'
]