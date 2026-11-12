(function () {
  'use strict';
  angular.module('todoApp', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/login', { templateUrl: 'app/auth/login.html', controller: 'AuthController' })
        .when('/todos', { templateUrl: 'app/todo/todo.html', controller: 'TodoController', resolve: { auth: ['AuthService', function (AuthService) { return AuthService.ensureAuthenticated(); }] } })
        .otherwise({ redirectTo: '/login' });
    }])
    .run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
      $rootScope.$on('$routeChangeStart', function (event, next) {
        const route = next && next.$$route;
        if (route && route.originalPath !== '/login' && !AuthService.isLoggedIn()) {
          event.preventDefault(); $location.path('/login');
        }
        if (route && route.originalPath === '/login' && AuthService.isLoggedIn()) $location.path('/todos');
      });
      $rootScope.isLoggedIn = function () { return AuthService.isLoggedIn(); };
      $rootScope.logout = function () { AuthService.logout(); $location.path('/login'); };
    }]);
}());
