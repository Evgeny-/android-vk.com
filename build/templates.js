angular.module('App').run(['$templateCache', function($templateCache) {

  $templateCache.put('views/album.html',
    "<div ng-controller=\"AlbumController\" id=\"album\" class=\"page\">\n" +
    "    <div class=\"image\"\n" +
    "         ng-repeat=\"image in images\"\n" +
    "         ng-click=\"openPhoto(image.id)\"\n" +
    "         ng-style=\"{'background-image': 'url('+image.image_small+')'}\">\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/albums.html',
    "<div ng-controller=\"AlbumsController\" id=\"albums\" class=\"page\">\n" +
    "    <div class=\"album\" ng-repeat=\"album in albums\" ng-click=\"$go.go('/albums/'+album.id)\">\n" +
    "        <div ng-style=\"{'background-image': 'url('+album.image+')'}\" class=\"img\"></div>\n" +
    "        <div class=\"meta\">\n" +
    "            <div class=\"title\" ng-bind=\"album.title\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/header.html',
    "<table ng-controller=\"HeaderController\" id=\"header\">\n" +
    "    <tr>\n" +
    "        <td class=\"back\">\n" +
    "            <a ng-click=\"goBack()\"><i class=\"icon-left-open\"></i></a> <!-- ng-if=\"BACK_BUTTON\"-->\n" +
    "        </td>\n" +
    "        <td class=\"title\" ng-bind-html=\"PAGE_TITLE\"></td>\n" +
    "        <td class=\"menu\">\n" +
    "            <a ng-click=\"openMenu()\"><i class=\"icon-menu\"></i></a>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>\n" +
    "\n" +
    "<div id=\"header-push\"></div>"
  );


  $templateCache.put('views/loader.html',
    "<div id=\"loader\" ng-controller=\"LoaderController\" ng-show=\"showed\" ng-class=\"position\">\n" +
    "    <span>Загрузка <i class=\"icon-spin4 animate-spin\"></i></span>\n" +
    "</div>"
  );


  $templateCache.put('views/main.html',
    "<div id=\"main\" class=\"page\" ng-controller=\"MainController\">\n" +
    "    <img ng-src=\"{{ info.image }}\">\n" +
    "    <h2 ng-bind=\"info.name\"></h2>\n" +
    "    <small ng-bind=\"info.status\" ng-if=\"info.status\"></small>\n" +
    "\n" +
    "    <table class=\"controls\">\n" +
    "        <tr>\n" +
    "            <td class=\"tl\" ng-click=\"$go.go('/posts')\">\n" +
    "                <div>\n" +
    "                    <i class=\"icon--posts\"></i><br>Посты\n" +
    "                    <span ng-if=\"count.posts\" ng-bind=\"count.posts\"></span>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td class=\"tr\" ng-click=\"$go.go('/saved')\">\n" +
    "                <div>\n" +
    "                    <i class=\"icon--fav\"></i><br>Избранное\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"bl\" ng-click=\"$go.go('/albums')\">\n" +
    "                <div>\n" +
    "                    <i class=\"icon--photos\"></i><br>Альбомы\n" +
    "                    <span ng-if=\"count.photos\" ng-bind=\"count.photos\"></span>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td class=\"br\" ng-click=\"$go.go('/settings')\">\n" +
    "                <div>\n" +
    "                    <i class=\"icon--settings\"></i><br>Настройки\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/menu.html',
    "<div id=\"menu\" ng-controller=\"MenuController\">\n" +
    "    <table class=\"group-info\">\n" +
    "        <tr>\n" +
    "            <td class=\"avatar\"><img ng-src=\"{{ info.image }}\"></td>\n" +
    "            <td class=\"name\">{{ info.name }}</td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "\n" +
    "    <ul>\n" +
    "        <li>\n" +
    "            <a ng-click=\"openPage('/posts')\" ng-class=\"{new: new.posts}\">\n" +
    "                Посты <span ng-if=\"new.posts\" ng-bind=\"new.posts\"></span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "        <li><a ng-click=\"openPage('/saved')\">Сохраненные</a></li>\n" +
    "        <li>\n" +
    "            <a ng-click=\"openPage('/albums')\" ng-class=\"{new: new.photos}\">\n" +
    "                Альбомы <span ng-if=\"new.photos\" ng-bind=\"new.photos\"></span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "        <li><a ng-click=\"openPage('/settings')\">Настройки</a></li>\n" +
    "    </ul>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/photos-view.html',
    "<div ng-controller=\"PhotosViewController\" id=\"photos-view\" class=\"page\" ng-show=\"images\">\n" +
    "    <div ng-if=\"images\">\n" +
    "        <table class=\"header\">\n" +
    "            <tr>\n" +
    "                <td class=\"title\">Просмотр изображений</td>\n" +
    "                <td class=\"close\">\n" +
    "                    <a ng-click=\"closePhotos()\"><i class=\"icon-cancel-1\"></i></a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "\n" +
    "        <div class=\"header-push\"></div>\n" +
    "\n" +
    "        <div class=\"title-count\">\n" +
    "            Изображение <i ng-if=\"loading\" class=\"icon-loader animate-spin\"></i>\n" +
    "            <span ng-if=\"!loading\" ng-bind=\"id+1\"></span> из {{images.length}}\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"image-container\">\n" +
    "            <div class=\"prev\" ng-click=\"prevPhoto()\" ng-if=\"images.length>1\"></div>\n" +
    "            <i class=\"icon-left-open-big icon-prev\" ng-if=\"images.length>1\"></i>\n" +
    "            <img ng-src=\"{{images[id].image_big}}\" ng-onload=\"loaded()\">\n" +
    "            <div class=\"next\" ng-click=\"nextPhoto()\" ng-if=\"images.length>1\"></div>\n" +
    "            <i class=\"icon-right-open-big icon-next\" ng-if=\"images.length>1\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"description\" ng-bind=\"images[id].desc\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/posts.html',
    "\n" +
    "<div id=\"posts\" class=\"page\" ng-controller=\"PostsController\">\n" +
    "\n" +
    "    <div class=\"message\" ng-if=\"isSavedPage && !posts.length\">\n" +
    "        Вы не сохранили ни одного поста.\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-repeat=\"post in posts | orderBy:sortBy:true\" class=\"post\">\n" +
    "\n" +
    "        <div class=\"text\" ng-show=\"post.text.length\" ng-init=\"text = (post.text | readMore); show=false\">\n" +
    "            <span ng-bind-html=\"text[0]\"></span>\n" +
    "            <a ng-show=\"text[1] && ! show\" ng-click=\"show=true\" class=\"read-more\">Читать далее</a>\n" +
    "            <span ng-show=\"show\" ng-bind-html=\"text[1]\"></span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"images\" ng-if=\"post.images\" ng-init=\"showMore=false\">\n" +
    "            <div class=\"image\" ng-repeat=\"image in post.images\">\n" +
    "                <div class=\"image-wrap\">\n" +
    "                    <img ng-src=\"{{ image.src }}\">\n" +
    "                    <span ng-click=\"openImage(post, image.id)\" class=\"icon--zoom\"></span>\n" +
    "                </div>\n" +
    "                <span ng-bind=\"image.text\" ng-if=\"image.text\"></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"!showMore && post.imagesMore\"\n" +
    "                 ng-click=\"showMore=true\" class=\"show-more\"\n" +
    "                 ng-bind=\"post.imagesMore.length | showMore\"></div>\n" +
    "\n" +
    "            <div ng-if=\"showMore\" class=\"image\" ng-repeat=\"image in post.imagesMore\">\n" +
    "                <div class=\"image-wrap\">\n" +
    "                    <img ng-src=\"{{ image.src }}\">\n" +
    "                    <span ng-click=\"openImage(post, image.id)\" class=\"icon--zoom\"></span>\n" +
    "                </div>\n" +
    "                <span ng-bind=\"image.text\" ng-if=\"image.text\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"gifs\" ng-if=\"post.gifs\">\n" +
    "            <div class=\"gif\" ng-repeat=\"gif in post.gifs\" ng-click=\"gif.photo=gif.src\">\n" +
    "                <img ng-src=\"{{ gif.photo }}\">\n" +
    "                <div class=\"play\"><i class=\"icon-play\"></i></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"videos\" ng-if=\"post.videos\">\n" +
    "            <div class=\"video\" ng-repeat=\"video in post.videos\">\n" +
    "                <img ng-src=\"{{ video.photo }}\">\n" +
    "                <div class=\"title\">\n" +
    "                    <div ng-bind=\"video.title\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"files\" ng-if=\"post.files.length\">\n" +
    "            <div ng-repeat=\"file in post.files\">\n" +
    "                <i class=\"icon-attach\"></i>\n" +
    "                <!--<span class=\"file\">Файл</span>-->\n" +
    "                <a ng-click=\"openLink(file.url)\" ng-bind=\"file.title\"></a>\n" +
    "                <span class=\"size\" ng-bind=\"file.size | filesize\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <table class=\"meta\">\n" +
    "            <tr>\n" +
    "                <td class=\"time\" am-time-ago=\"post.date\"></td>\n" +
    "                <td class=\"like\">\n" +
    "                    <i ng-click=\"likePost(post)\" ng-class=\"{liked: isLiked(post.id)}\"></i>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('views/settings.html',
    "<div ng-controller=\"SettingsController\" id=\"settings\" class=\"page\">\n" +
    "    <table class=\"settings-grid\">\n" +
    "        <tr>\n" +
    "            <td class=\"label\">Автообновление данных</td>\n" +
    "            <td class=\"control\"><switcher model=\"config.autoUpdate\"></switcher></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td class=\"label\">Высокое качество изображений</td>\n" +
    "            <td class=\"control\"><switcher model=\"config.highRes\"></switcher></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>"
  );

}]);
