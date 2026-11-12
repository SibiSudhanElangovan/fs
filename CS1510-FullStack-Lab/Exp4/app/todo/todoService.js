(function () {
  'use strict';
  angular.module('todoApp')
    .service('TodoService', ['$q', '$timeout', function ($q, $timeout) {
      let nextId = 4;
      let todos = [
        { id: 1, text: 'Learn AngularJS', completed: false, username: 'Raghavi' },
        { id: 2, text: 'Build a to-do app', completed: true, username: 'Raghavi' },
        { id: 3, text: 'Deploy to production', completed: false, username: 'user2' }
      ];
      this.getTodos = function (username) {
        const deferred = $q.defer();
        $timeout(() => deferred.resolve(todos.filter(todo => todo.username === username).map(todo => angular.copy(todo))), 150);
        return deferred.promise;
      };
      this.addTodo = function (todo) {
        const deferred = $q.defer();
        $timeout(() => { const saved = angular.extend({}, todo, { id: nextId++ }); todos.push(saved); deferred.resolve(angular.copy(saved)); }, 120);
        return deferred.promise;
      };
      this.updateTodo = function (todo) {
        const deferred = $q.defer();
        $timeout(() => { const index = todos.findIndex(item => item.id === todo.id); if (index >= 0) todos[index] = angular.copy(todo); deferred.resolve(); }, 100);
        return deferred.promise;
      };
      this.deleteTodo = function (id) {
        const deferred = $q.defer();
        $timeout(() => { todos = todos.filter(todo => todo.id !== id); deferred.resolve(); }, 100);
        return deferred.promise;
      };
    }])
    .controller('TodoController', ['$scope', 'AuthService', 'TodoService', function ($scope, AuthService, TodoService) {
      $scope.currentUser = AuthService.getCurrentUser();
      $scope.newTodo = ''; $scope.todos = []; $scope.error = '';
      $scope.completedCount = function () { return $scope.todos.filter(todo => todo.completed).length; };
      TodoService.getTodos($scope.currentUser.username).then(todos => { $scope.todos = todos; });
      $scope.addTodo = function () {
        const text = $scope.newTodo.trim(); if (!text) return;
        TodoService.addTodo({ text, completed: false, username: $scope.currentUser.username }).then(todo => { $scope.todos.push(todo); $scope.newTodo = ''; });
      };
      $scope.toggleTodo = function (todo) { TodoService.updateTodo(todo); };
      $scope.deleteTodo = function (todo) { TodoService.deleteTodo(todo.id).then(() => { $scope.todos = $scope.todos.filter(item => item.id !== todo.id); }); };
    }]);
}());
