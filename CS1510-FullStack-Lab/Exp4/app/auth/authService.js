(function () {
  'use strict';
  angular.module('todoApp')
    .service('AuthService', ['$q', '$timeout', function ($q, $timeout) {
      let currentUser = null;
      const users = [
        { username: 'Raghavi', password: 'pass@123' },
        { username: 'user2', password: 'pass2' }
      ];
      this.login = function (credentials) {
        const deferred = $q.defer();
        $timeout(function () {
          const found = users.find(user => user.username === credentials.username && user.password === credentials.password);
          if (found) { currentUser = { username: found.username }; deferred.resolve(currentUser); }
          else deferred.reject({ message: 'Invalid username or password.' });
        }, 350);
        return deferred.promise;
      };
      this.logout = function () { currentUser = null; };
      this.isLoggedIn = function () { return currentUser !== null; };
      this.getCurrentUser = function () { return currentUser; };
      this.ensureAuthenticated = function () {
        const deferred = $q.defer();
        if (this.isLoggedIn()) deferred.resolve(currentUser);
        else deferred.reject({ message: 'Not authenticated.' });
        return deferred.promise;
      };
    }])
    .controller('AuthController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
      $scope.user = { username: '', password: '' };
      $scope.error = '';
      $scope.login = function () {
        $scope.error = '';
        AuthService.login($scope.user).then(() => $location.path('/todos'), error => { $scope.error = error.message; });
      };
    }]);
}());
