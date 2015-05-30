(function() {
  var App;

  App = angular.module('App', ['ngRoute', 'ngResource', 'ngTouch', 'ngMoment']);

  App.config([
    '$sceProvider', function($sce) {
      return $sce.enabled(false);
    }
  ]);

  App.config([
    '$routeProvider', function($route) {
      return $route.when('/posts', {
        templateUrl: 'views/posts.html',
        title: 'Посты',
        disableBack: true,
        counter: 'posts',
        name: 'posts'
      }).when('/', {
        templateUrl: 'views/main.html',
        title: 'Главная страница',
        disableMenu: true,
        name: 'index'
      }).when('/albums', {
        templateUrl: 'views/albums.html',
        title: 'Альбомы',
        counter: 'photos',
        name: 'albums'
      }).when('/albums/:id', {
        templateUrl: 'views/album.html',
        title: 'Просмотр альбома',
        name: 'photos'
      }).when('/saved', {
        templateUrl: 'views/posts.html',
        title: 'Сохраненные посты',
        name: 'saved'
      }).when('/settings', {
        templateUrl: 'views/settings.html',
        title: 'Настройки',
        name: 'settings'
      }).otherwise({
        redirectTo: '/posts'
      });
    }
  ]);

  App.constant('OPTIONS', {
    id: -35632477,
    maxImages: 1,
    postsPerOnce: 8,
    highRes: true,
    autoUpdate: true,
    updatePer: 120000
  });

  App.value('GROUP_OPTIONS', {
    name: 'Deep space',
    image: 'images/space.jpg',
    status: 'Космос в картинках и фактах'
  });

  App.constant('CONST', {
    HEADER: 'views/header.html',
    LOADER: 'views/loader.html',
    MENU: 'views/menu.html',
    PHOTOS_VIEW: 'views/photos-view.html',
    PAGES_VIEW: 'views/pages-view.html'
  });

  App.run([
    'Menu', 'PhotosView', function(Menu, PhotosView) {
      return document.addEventListener('deviceready', (function() {
        document.addEventListener('menubutton', function(e) {
          if (Menu.isOpen()) {
            Menu.hide();
          } else {
            Menu.show();
          }
          e.preventDefault();
          return false;
        });
        return document.addEventListener('backbutton', function(e) {
          if (PhotosView.opened()) {
            PhotosView.close();
            e.preventDefault();
            return false;
          } else if (Menu.isOpen()) {
            Menu.hide();
            e.preventDefault();
            return false;
          }
          return true;
        });
      }), false);
    }
  ]);

  App.run([
    '$rootScope', 'CONST', function($rootScope, CONST) {
      return $rootScope.CONST = CONST;
    }
  ]);

  App.run([
    '$location', '$rootScope', 'PhotosView', function($location, $rootScope, PhotosView) {
      $rootScope.$go = {
        go: function(url) {
          return $location.path(url);
        }
      };
      $rootScope.openPhoto = PhotosView.open;
      $rootScope.BACK_BUTTON = true;
      return $rootScope.openMail = function(email) {
        return window.open("mailto:" + email, "_system");
      };
    }
  ]);

  App.run([
    'Group', 'GROUP_OPTIONS', function(Group, GROUP_OPTIONS) {
      return Group.get(function(res) {
        if (GROUP_OPTIONS.name === null) {
          GROUP_OPTIONS.name = res.name;
        }
        if (GROUP_OPTIONS.image === null) {
          GROUP_OPTIONS.image = res.photo_100;
        }
        if (GROUP_OPTIONS.status === null) {
          return GROUP_OPTIONS.status = res.status;
        }
      });
    }
  ]);

  App.run([
    '$location', '$rootScope', 'Counter', function($location, $rootScope, Counter) {
      return $rootScope.$on('$routeChangeStart', function(e, c) {
        if (c.$$route && c.$$route.title) {
          $rootScope.PAGE_TITLE = c.$$route.title;
        }
        $rootScope.BACK_BUTTON = !(c.$$route.disableBack || false);
        $rootScope.SHOW_HEADER = !(c.$$route.disableMenu || false);
        $rootScope.PAGE_NAME = c.$$route.name || null;
        if (c.$$route.counter != null) {
          Counter.clear(c.$$route.counter);
        }
        return window.scrollTo(0, 0);
      });
    }
  ]);

  App.run([
    'Posts', 'Albums', 'Settings', function(Posts, Albums, Settings) {
      var update;
      update = function() {
        if (!Settings.get('autoUpdate')) {
          return;
        }
        Posts.updateCache();
        return Albums.updateCache();
      };
      setInterval(update, Settings.get('updatePer'));
      return update();
    }
  ]);

  App.controller('AlbumController', [
    '$scope', 'Album', '$routeParams', 'Loader', 'PhotosView', function($scope, Album, $routeParams, Loader, PhotosView) {
      var albumId, getImageId, loadAlbum;
      albumId = $routeParams.id;
      $scope.images = [];
      $scope.openPhoto = function(id) {
        id = getImageId(id);
        if (typeof id !== "undefined") {
          return PhotosView.open($scope.images, id);
        }
      };
      loadAlbum = function() {
        return Album.get(albumId, function(res) {
          Loader.hide();
          $scope.images = res;
          return $scope.$watchCollection('images', function() {})();
        });
      };
      getImageId = function(id) {
        var i, image, _i, _len, _ref;
        _ref = $scope.images;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          image = _ref[i];
          if (image.id === id) {
            return i;
          }
        }
      };
      Loader.show();
      return loadAlbum();
    }
  ]);

  App.controller('AlbumsController', [
    '$scope', 'Albums', 'Loader', function($scope, Albums, Loader) {
      $scope.albums = [];
      Loader.show('top');
      return Albums.get(function(res) {
        Loader.hide();
        return $scope.albums = res;
      });
    }
  ]);

  App.controller('HeaderController', [
    '$scope', '$location', 'Menu', function($scope, $location, Menu) {
      $scope.goBack = function() {
        return history.back();
      };
      return $scope.openMenu = function() {
        return Menu.open();
      };
    }
  ]);

  App.controller('LoaderController', [
    '$rootScope', '$scope', function($rootScope, $scope) {
      $scope.showed = false;
      $scope.position = null;
      $rootScope.$on('loader:show', function(e, pos) {
        $scope.position = pos;
        return $scope.showed = true;
      });
      return $rootScope.$on('loader:hide', function() {
        $scope.showed = false;
        return $scope.position = null;
      });
    }
  ]);

  App.controller('MainController', [
    '$scope', 'GROUP_OPTIONS', 'Counter', function($scope, GROUP_OPTIONS, Counter) {
      var updateCounters;
      $scope.info = GROUP_OPTIONS;
      $scope.count = null;
      updateCounters = function() {
        var key, value, _ref, _results;
        $scope.count = Counter.getCountAll();
        _ref = $scope.count;
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          if (value > 9) {
            _results.push($scope.count[key] = '9+');
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      Counter.onChange(updateCounters);
      return updateCounters();
    }
  ]);

  App.controller("MenuController", [
    '$scope', '$rootScope', 'Menu', '$location', 'GROUP_OPTIONS', 'PhotosView', 'Counter', function($scope, $rootScope, Menu, $location, GROUP_OPTIONS, PhotosView, Counter) {
      var disableScroll, enableScroll, preventDef, updateCounters;
      $rootScope.openedMenu = false;
      $scope.info = GROUP_OPTIONS;
      $scope["new"] = null;
      $rootScope.openPage = function(url) {
        $rootScope.hideMenu();
        return $location.path(url);
      };
      $rootScope.showMenu = function() {
        if (PhotosView.opened()) {
          return;
        }
        $rootScope.openedMenu = true;
        return disableScroll();
      };
      $rootScope.hideMenu = function() {
        if (PhotosView.opened()) {
          return;
        }
        $rootScope.openedMenu = false;
        return enableScroll();
      };
      preventDef = function(e) {
        return e.preventDefault();
      };
      updateCounters = function() {
        var key, value, _ref, _results;
        $scope["new"] = Counter.getCountAll();
        _ref = $scope["new"];
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          if (value > 99) {
            _results.push($scope["new"][key] = '99+');
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      disableScroll = function() {
        document.addEventListener('ontouchstart', preventDef, false);
        document.addEventListener('ontouchmove', preventDef, false);
        return window.addEventListener('DOMMouseScroll', preventDef, false);
      };
      enableScroll = function() {
        document.removeEventListener('ontouchstart', preventDef, false);
        document.removeEventListener('ontouchmove', preventDef, false);
        return window.removeEventListener('DOMMouseScroll', preventDef, false);
      };
      Menu.on("open", $rootScope.showMenu);
      Menu.on("close", $rootScope.hideMenu);
      Counter.onChange(updateCounters);
      return updateCounters();
    }
  ]);

  App.controller('PagesViewController', [
    '$scope', '$rootScope', 'PagesView', 'Page', function($scope, $rootScope, PagesView, Page) {
      $scope.title = null;
      $scope.html = null;
      $scope.closePage = function() {
        return PagesView.close();
      };
      $rootScope.$on('Page:open', function(e, title, url) {
        $scope.url = url;
        $scope.title = title;
        return $scope.html = null;
      });
      return $rootScope.$on('Page:close', function() {
        $scope.url = null;
        $scope.title = null;
        return $scope.html = null;
      });
    }
  ]);

  App.controller('PhotosViewController', [
    '$scope', '$rootScope', 'PhotosView', function($scope, $rootScope, PhotosView) {
      $scope.images = null;
      $scope.id = null;
      $scope.loading = true;
      $scope.closePhotos = function() {
        return PhotosView.close();
      };
      $scope.nextPhoto = function() {
        if ($scope.id + 1 < $scope.images.length) {
          $scope.id++;
        } else {
          $scope.id = 0;
        }
        return $scope.loading = true;
      };
      $scope.prevPhoto = function() {
        if ($scope.id > 0) {
          $scope.id--;
        } else {
          $scope.id = $scope.images.length - 1;
        }
        return $scope.loading = true;
      };
      $scope.loaded = function() {
        return $scope.loading = false;
      };
      $rootScope.$on('Photo:open', function(e, images, id) {
        $scope.images = images;
        $scope.id = +id;
        return $scope.loading = true;
      });
      return $rootScope.$on('Photo:close', function() {
        $scope.images = null;
        $scope.id = null;
        return $scope.loading = false;
      });
    }
  ]);

  App.controller('PostsController', [
    '$scope', 'Posts', 'Loader', 'Store', 'PhotosView', 'PagesView', function($scope, Posts, Loader, Store, PhotosView, PagesView) {
      var canLoad, existPost, insertPosts, isSavedPage, liked, loadMorePosts, onScroll, page, win;
      page = 0;
      canLoad = true;
      win = angular.element(window);
      liked = Store.get('liked') || [];
      isSavedPage = location.hash.indexOf('saved') !== -1;
      $scope.posts = [];
      $scope.isSavedPage = isSavedPage;
      $scope.sortBy = isSavedPage ? 'likePost' : 'id';
      $scope.likePost = function(post) {
        post.isLiked = !post.isLiked;
        if (!post.isLiked) {
          liked = liked.filter(function(p) {
            return p.id !== post.id;
          });
        } else {
          post.likePost = +(new Date);
          liked.push(post);
        }
        return Store.set('liked', liked);
      };
      $scope.isLiked = function(id) {
        var post, _i, _len;
        for (_i = 0, _len = liked.length; _i < _len; _i++) {
          post = liked[_i];
          if (id === post.id) {
            return true;
          }
        }
        return false;
      };
      $scope.openLink = function(url) {
        return window.open(url, '_system');
      };
      $scope.openImage = function(post, id) {
        return PhotosView.openPostPhotos(post, id);
      };
      $scope.openPage = function(page) {
        return PagesView.openPage(page.title, page.url);
      };
      loadMorePosts = function() {
        canLoad = false;
        Loader.show();
        return Posts.get(page++, function(posts) {
          Loader.hide();
          insertPosts(posts);
          return canLoad = true;
        });
      };
      insertPosts = function(posts) {
        var post, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = posts.length; _i < _len; _i++) {
          post = posts[_i];
          if (!existPost(post.id)) {
            _results.push($scope.posts.push(post));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      existPost = function(id) {
        var post, _i, _len, _ref;
        _ref = $scope.posts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          post = _ref[_i];
          if (post.id === id) {
            return true;
          }
        }
        return false;
      };
      onScroll = function() {
        var docHeight;
        if (!canLoad) {
          return;
        }
        docHeight = document.getElementById("posts").clientHeight;
        if ((docHeight - window.innerHeight - window.pageYOffset) < 1000) {
          loadMorePosts();
          return $scope.$apply();
        }
      };
      if (isSavedPage) {
        return $scope.posts = Store.get('liked') || [];
      } else {
        loadMorePosts();
        win.bind('scroll', onScroll);
        return $scope.$on('$destroy', function() {
          return win.unbind('scroll', onScroll);
        });
      }
    }
  ]);

  App.controller('SettingsController', [
    '$scope', 'Settings', function($scope, Settings) {
      $scope.config = {
        autoUpdate: Settings.get('autoUpdate'),
        highRes: Settings.get('highRes')
      };
      return $scope.$watch('config', (function() {
        var key, value, _ref, _results;
        _ref = $scope.config;
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          _results.push(Settings.set(key, value));
        }
        return _results;
      }), true);
    }
  ]);

  App.directive('ngOnload', function() {
    return function(scope, el, attr) {
      return el.on('load', function() {
        return scope.$apply(attr.ngOnload);
      });
    };
  });

  App.directive('switcher', function() {
    return {
      restrict: "EA",
      replace: true,
      scope: {
        model: "=",
        onLabel: "@",
        offLabel: "@"
      },
      template: "      <div class=\"switch\" ng-click=\"toggle()\">         <div ng-class=\"{'switch-off': !model, 'switch-on': model}\">            <span class=\"switch-left\">Да</span>            <span class=\"knob\">&nbsp;</span>            <span class=\"switch-right\">Нет</span>         </div>      </div>   ",
      link: function($scope, element, attrs) {
        return $scope.toggle = function() {
          element.children().addClass("switch-animate");
          return $scope.model = !$scope.model;
        };
      }
    };
  });

  App.filter('filesize', function() {
    return function(size) {
      if (isNaN(size)) {
        size = 0;
      }
      if (size < 1024) {
        return size + " байт";
      }
      size /= 1024;
      if (size < 1024) {
        return size.toFixed(1) + " Кб";
      }
      size /= 1024;
      if (size < 1024) {
        return size.toFixed(1) + " Мб";
      }
      size /= 1024;
      if (size < 1024) {
        return size.toFixed(1) + " Гб";
      }
      size /= 1024;
      return size.toFixed(1) + " Тб";
    };
  });

  App.filter('parseDate', function() {
    return function(date) {
      return date * 1000;
    };
  });

  App.filter("readMore", function() {
    var LEN;
    LEN = 300;
    return function(text) {
      var other, result, spell, words;
      if (text.length < LEN + 50) {
        return [text, null];
      }
      words = text.replace('.\n', '. \n').split(". ");
      result = "";
      spell = 0;
      while (result.length < LEN) {
        result += words[spell++] + ". ";
      }
      other = text.slice(result.length);
      if (other.length < 50) {
        return [result + other, null];
      } else {
        return [result, other];
      }
    };
  });

  App.filter("showMore", function() {
    return function(count) {
      var word;
      word = (function() {
        switch (false) {
          case count !== 1:
            return 'изображение';
          case [2, 3, 4].indexOf(count) === -1:
            return 'изображения';
          default:
            return 'изображений';
        }
      })();
      return "Показать еще " + count + " " + word;
    };
  });

  App.service('Album', [
    'VKApi', 'OPTIONS', 'Settings', (function() {
      var options, parseError, parsePhoto, parsePhotos, parseResult, settings;

      options = {};

      settings = null;

      parseResult = function(callback) {
        return function(res) {
          var _ref;
          if ((_ref = res.response) != null ? _ref.items : void 0) {
            return parsePhotos(res.response.items, callback);
          } else {
            return parseError(res.error, callback);
          }
        };
      };

      parseError = function(error, callback) {
        return callback({
          error: error
        });
      };

      parsePhotos = function(photos, callback) {
        return callback(photos.map(parsePhoto));
      };

      parsePhoto = function(photo) {
        return {
          id: photo.id,
          desc: photo.text,
          image_big: settings.get('highRes') ? (photo.photo_807 || photo.photo_604) || photo.photo_604 : void 0,
          image_small: photo.photo_130,
          ratio: photo.width / photo.height
        };
      };

      function _Class(VKApi, OPTIONS, Settings) {
        this.VKApi = VKApi;
        options = OPTIONS;
        settings = Settings;
      }

      _Class.prototype.get = function(album, callback) {
        return this.VKApi.get('photos.get', {
          owner_id: options.id,
          album_id: album,
          need_system: 1
        }, parseResult(callback));
      };

      return _Class;

    })()
  ]);

  App.service('Albums', [
    'VKApi', 'OPTIONS', 'Counter', (function() {
      var options, parseAlbum, parseAlbums, parseError, parseResult;

      options = {};

      parseResult = function(callback) {
        return function(res) {
          var _ref;
          if ((_ref = res.response) != null ? _ref.items : void 0) {
            return parseAlbums(res.response.items, callback);
          } else {
            return parseError(res.error, callback);
          }
        };
      };

      parseError = function(error, callback) {
        return callback({
          error: error
        });
      };

      parseAlbums = function(albums, callback) {
        return callback(albums.map(parseAlbum));
      };

      parseAlbum = function(album) {
        return {
          id: album.id,
          desc: album.description,
          image: album.thumb_src,
          title: album.title,
          count: album.size
        };
      };

      function _Class(VKApi, OPTIONS, Counter) {
        this.VKApi = VKApi;
        this.Counter = Counter;
        options = OPTIONS;
      }

      _Class.prototype.get = function(callback) {
        return this.VKApi.get('photos.getAlbums', {
          owner_id: options.id,
          need_covers: 1,
          need_system: 1,
          count: 50
        }, parseResult(callback));
      };

      _Class.prototype.updateCache = function() {
        var counter,
          _this = this;
        counter = this.Counter.get('photos');
        return this.get(function(albums) {
          var count, diff;
          count = 0;
          albums.forEach(function(album) {
            return count += album.count;
          });
          if (counter.last === null) {
            return _this.Counter.add('photos', 0, count);
          }
          diff = count - counter.last;
          if (diff > 0) {
            return _this.Counter.add('photos', diff, count);
          }
        });
      };

      return _Class;

    })()
  ]);

  App.service('Counter', [
    'Store', (function() {
      _Class.prototype["default"] = {
        posts: {
          last: null,
          count: 0
        },
        photos: {
          last: null,
          count: 0
        }
      };

      _Class.prototype.counters = {};

      _Class.prototype.listeners = [];

      function _Class(Store) {
        this.Store = Store;
        this.counters = this.Store.get('counters') || this["default"];
      }

      _Class.prototype._save = function() {
        this.Store.set('counters', this.getAll());
        return this._fire();
      };

      _Class.prototype._fire = function() {
        return this.listeners.forEach(function(cb) {
          return cb();
        });
      };

      _Class.prototype.onChange = function(cb) {
        return this.listeners.push(cb);
      };

      _Class.prototype.add = function(type, count, last) {
        return this.set(type, this.getAll()[type].count + count, last);
      };

      _Class.prototype.set = function(type, value, last) {
        this.counters[type] = {
          count: value,
          last: last
        };
        return this._save();
      };

      _Class.prototype.get = function(type) {
        return this.getAll()[type];
      };

      _Class.prototype.getAll = function() {
        return JSON.parse(JSON.stringify(this.counters));
      };

      _Class.prototype.getCount = function(type) {
        return this.get(type).count;
      };

      _Class.prototype.getCountAll = function() {
        var counters, key, value;
        counters = this.getAll();
        for (key in counters) {
          value = counters[key];
          counters[key] = value.count;
        }
        return counters;
      };

      _Class.prototype.clear = function(type) {
        this.counters[type].count = 0;
        return this._save();
      };

      return _Class;

    })()
  ]);

  App.service('Group', [
    'VKApi', 'OPTIONS', (function() {
      var options, parseError, parseGroup, parseResult;

      options = {};

      parseResult = function(callback) {
        return function(res) {
          var _ref;
          if ((_ref = res.response) != null ? _ref[0] : void 0) {
            return parseGroup(res.response[0], callback);
          } else {
            return parseError(res.error, callback);
          }
        };
      };

      parseError = function(error, callback) {
        return callback({
          error: error
        });
      };

      parseGroup = function(res, callback) {
        return callback(res);
      };

      function _Class(VKApi, OPTIONS) {
        this.VKApi = VKApi;
        options = OPTIONS;
      }

      _Class.prototype.get = function(callback) {
        return this.VKApi.get('groups.getById', {
          group_id: -options.id,
          fields: 'status'
        }, parseResult(callback));
      };

      return _Class;

    })()
  ]);

  App.service('Loader', [
    '$rootScope', '$timeout', (function() {
      var showed, time, title;

      showed = false;

      time = 0;

      title = null;

      function _Class($rootScope, $timeout) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
      }

      _Class.prototype.isShowed = function() {
        return showed;
      };

      _Class.prototype.show = function(pos) {
        if (pos == null) {
          pos = 'top';
        }
        title = this.$rootScope.PAGE_TITLE;
        showed = true;
        time = +(new Date);
        return this.$rootScope.PAGE_TITLE = '<span>Загрузка <i class="icon-loader animate-spin"></i></span>';
      };

      _Class.prototype.hide = function(minloadtime) {
        var now;
        if (minloadtime == null) {
          minloadtime = 0;
        }
        now = +(new Date);
        if (now < time + minloadtime) {
          return this.$timeout(this._hide.bind(this), minloadtime - (now - time));
        } else {
          return this._hide();
        }
      };

      _Class.prototype._hide = function() {
        showed = false;
        this.$rootScope.PAGE_TITLE = title;
        return time = +(new Date);
      };

      return _Class;

    })()
  ]);

  App.service("Menu", [
    (function() {
      var callbacks, fire, opened;

      function _Class() {}

      opened = false;

      callbacks = {
        open: [],
        close: []
      };

      fire = function(type) {
        return callbacks[type].forEach(function(callback) {
          return callback.call(null);
        });
      };

      _Class.prototype.open = function() {
        opened = true;
        return fire("open");
      };

      _Class.prototype.close = function() {
        opened = true;
        return fire("close");
      };

      _Class.prototype.on = function(type, callback) {
        return callbacks[type].push(callback);
      };

      _Class.prototype.isOpen = function() {
        return opened;
      };

      return _Class;

    })()
  ]);

  App.service('Page', [
    'VKApi', 'OPTIONS', (function() {
      var options, parseResult;

      options = {};

      parseResult = function(callback) {
        return function(res) {
          return console.log(res);
        };
      };

      function _Class(VKApi, OPTIONS, Settings) {
        this.VKApi = VKApi;
        options = OPTIONS;
      }

      _Class.prototype.get = function(page, callback) {
        return this.VKApi.get('pages.get', {
          owner_id: options.id,
          page_id: page,
          need_html: 1
        }, parseResult(callback));
      };

      return _Class;

    })()
  ]);

  App.service('PagesView', [
    '$rootScope', (function() {
      var open;

      open = false;

      function _Class($rootScope) {
        this.$rootScope = $rootScope;
      }

      _Class.prototype.openPage = function(title, url) {
        open = true;
        return this.$rootScope.$emit('Page:open', title, url);
      };

      _Class.prototype.close = function() {
        open = false;
        return this.$rootScope.$emit('Page:close', null);
      };

      _Class.prototype.opened = function() {
        return open;
      };

      return _Class;

    })()
  ]);

  App.service('PhotosView', [
    '$rootScope', (function() {
      var formatImage, getId, open;

      open = false;

      getId = function(images, id) {
        var i, img, _i, _len;
        for (i = _i = 0, _len = images.length; _i < _len; i = ++_i) {
          img = images[i];
          if (img.id === id) {
            return i;
          }
        }
      };

      formatImage = function(image) {
        return {
          id: image.id,
          desc: image.text,
          image_big: image.src,
          image_small: image.src,
          ratio: image.width / image.height
        };
      };

      function _Class($rootScope) {
        this.$rootScope = $rootScope;
      }

      _Class.prototype.openPostPhotos = function(post, id) {
        var images;
        images = post.images.concat(post.imagesMore);
        images = images.map(formatImage);
        return this.open(images, getId(images, id) || 0);
      };

      _Class.prototype.open = function(images, id) {
        open = true;
        return this.$rootScope.$emit('Photo:open', images, id);
      };

      _Class.prototype.close = function() {
        open = false;
        return this.$rootScope.$emit('Photo:close', null);
      };

      _Class.prototype.opened = function() {
        return open;
      };

      return _Class;

    })()
  ]);

  App.service('Posts', [
    'VKApi', 'OPTIONS', 'Counter', 'Settings', (function() {
      var attachPhotoText, isValid, liked, options, parseError, parsePost, parsePosts, parseResult, parseText, replaceLinks, settings, store;

      store = null;

      settings = null;

      options = {};

      liked = [];

      parseResult = function(callback) {
        return function(res) {
          var _ref;
          if ((_ref = res.response) != null ? _ref.items : void 0) {
            return parsePosts(res.response.items, callback);
          } else {
            return parseError(res.error, callback);
          }
        };
      };

      parsePosts = function(posts, callback) {
        posts = posts.map(function(post) {
          return parsePost(post);
        });
        return callback(posts.filter(function(post) {
          return isValid(post);
        }));
      };

      parsePost = function(post) {
        var parsedPost, _ref, _ref1, _ref2,
          _this = this;
        parsedPost = {
          id: post.id,
          type: post.post_type,
          text: parseText(post.text),
          likes: (_ref = post.likes) != null ? _ref.count : void 0,
          reposts: (_ref1 = post.reposts) != null ? _ref1.count : void 0,
          date: post.date,
          images: [],
          imagesMore: [],
          gifs: [],
          videos: [],
          files: [],
          pages: []
        };
        if ((_ref2 = post.attachments) != null) {
          _ref2.forEach(function(attach) {
            var insertTo, photo;
            if (attach.type === 'photo') {
              photo = attach.photo;
              insertTo = parsedPost.images.length < options.maxImages ? 'images' : 'imagesMore';
              return parsedPost[insertTo].push({
                id: photo.id,
                src: settings.get('highRes') ? photo.photo_807 || photo.photo_604 : photo.photo_604,
                text: attachPhotoText(photo.text),
                height: photo.height,
                width: photo.width
              });
            } else if (attach.type === 'page') {
              return parsedPost.pages.push({
                id: attach.page.id,
                title: attach.page.title,
                url: attach.page.view_url
              });
            } else if (attach.type === 'video') {
              return parsedPost.videos.push({
                id: attach.video.id,
                title: attach.video.title,
                photo: attach.video.photo_320
              });
            } else if (attach.type === 'doc') {
              if (attach.doc.ext === 'gif') {
                return parsedPost.gifs.push({
                  src: attach.doc.url,
                  photo: attach.doc.photo_130
                });
              } else {
                return parsedPost.files.push({
                  url: attach.doc.url,
                  title: attach.doc.title,
                  size: attach.doc.size
                });
              }
            }
          });
        }
        return parsedPost;
      };

      attachPhotoText = function(text) {
        if (text.indexOf('Original:') !== 0) {
          return text;
        } else {
          return '';
        }
      };

      isValid = function(post) {
        return post.type !== 'copy' && (post.text.length > 30 || post.images.length || post.videos.length || post.gifs.length);
      };

      parseText = function(text) {
        text = replaceLinks(text);
        return text.replace(/\[(.*)\|(.*)\]/gi, '<a class="link" onclick="window.open(\'http://vk.com/$1\', \'_system\')">$2</a>');
      };

      replaceLinks = function(text) {
        var pattern1;
        pattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        return text.replace(pattern1, function(match) {
          var url;
          url = match.split('/');
          return "<a class=\"link\" onclick=\"window.open(\'" + match + "\', \'_system\')\">" + url[2] + "</a>";
        });
      };

      parseError = function(error, callback) {
        return callback({
          error: error
        });
      };

      function _Class(VKApi, OPTIONS, Counter, Settings) {
        this.VKApi = VKApi;
        this.Counter = Counter;
        options = OPTIONS;
        settings = Settings;
      }

      _Class.prototype.get = function(page, callback) {
        return this.VKApi.get('wall.get', {
          owner_id: options.id,
          offset: page * options.postsPerOnce,
          count: options.postsPerOnce
        }, parseResult(callback));
      };

      _Class.prototype.updateCache = function() {
        var counter, newPosts,
          _this = this;
        newPosts = 0;
        counter = this.Counter.get('posts');
        return this.get(0, function(posts) {
          if (counter.last === null) {
            return _this.Counter.add('posts', 0, posts[0].id);
          }
          posts.forEach(function(post) {
            if (post.id > counter.last) {
              return newPosts++;
            }
          });
          if (newPosts) {
            return _this.Counter.add('posts', newPosts, posts[0].id);
          }
        });
      };

      return _Class;

    })()
  ]);

  App.service('Settings', [
    'Store', 'OPTIONS', (function() {
      _Class.prototype._options = {};

      _Class.prototype._save = function() {
        return this.Store.set('options', this._options);
      };

      function _Class(Store, OPTIONS) {
        this.Store = Store;
        this.OPTIONS = OPTIONS;
        this._options = Store.get('options') || OPTIONS;
      }

      _Class.prototype.get = function(key) {
        return this._options[key];
      };

      _Class.prototype.set = function(key, value) {
        this._options[key] = value;
        return this._save();
      };

      return _Class;

    })()
  ]);

  App.service('Store', [
    (function() {
      function _Class() {}

      _Class.prototype.get = function(key, json) {
        var value;
        if (json == null) {
          json = true;
        }
        value = localStorage.getItem(key);
        if (!json) {
          return value;
        } else {
          return JSON.parse(value);
        }
      };

      _Class.prototype.set = function(key, value) {
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        return localStorage.setItem(key, value);
      };

      _Class.prototype.remove = function(key) {
        return this.set(key, null);
      };

      return _Class;

    })()
  ]);

  App.service('VKApi', [
    '$http', (function() {
      var serialize, url;

      url = 'https://api.vk.com/method/';

      serialize = function(obj) {
        var key, result, value;
        result = "?";
        for (key in obj) {
          value = obj[key];
          result += "" + key + "=" + value + "&";
        }
        return result;
      };

      function _Class($http) {
        this.$http = $http;
        this.$http.defaults.cache = true;
      }

      _Class.prototype.get = function(method, options, callback) {
        var link;
        link = url + method + serialize(options) + 'v=5.4&callback=JSON_CALLBACK';
        return this.$http.jsonp(link, {
          cache: true
        }).success(callback);
      };

      return _Class;

    })()
  ]);

}).call(this);
