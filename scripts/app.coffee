App = angular.module 'App', ['ngRoute', 'ngResource', 'ngTouch', 'ngMoment']

App.config ['$sceProvider', ($sce) -> $sce.enabled false]