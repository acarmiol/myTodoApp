'use strict';

// Declare app level module which depends on views, and components
angular.module('myTodos', [
  'ngRoute',
  'firebase',
  'myTodos.todos'

 
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/todos'});
}]);
