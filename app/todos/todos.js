'use strict';

angular.module('myTodos.todos', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/todos', {
    templateUrl: 'todos/todos.html',
    controller: 'TodosCtrl'
  });
}])

//Todos Controller
.controller('TodosCtrl', ['$scope','$firebaseArray', function($scope, $firebaseArray) {
	
    //init firebase
    var ref = new Firebase('https://mytodo-app.firebaseio.com/');
    
    //get todos
    $scope.todos = $firebaseArray(ref);
    //console.log($scope.todos)
    
    //show add form
    $scope.showAddForm = function(){
        $scope.addFormShow = true;
    } 
    //Hide Form
    $scope.hide = function(){
            $scope.addFormShow = false;  
    }
    //submit todo
    $scope.addFormSubmit = function(){
        console.log('adding todo....' )
         //assign values  
        
        if($scope.title){var title = $scope.title} else{ var title = null; }
        if($scope.description){ var description = $scope.description} else{ var description = null;  }
        if($scope.author){ var author = $scope.author} else{var author = null;}       

        //building object
        $scope.todos.$add({
        title: title, author:author, description:description
        }).then(function(ref){
            var id = ref.key();
            console.log('add todo with id:'+ id);
            
            //clear form
            clearFields();
            
            //hide form
            $scope.addFormShow = false;
            
            //sending msg to user
            $scope.msg = "Todo Added";
        });
      
         }
        $scope.removeTodo = function(todo){
            console.log('removing Todo');
            $scope.todos.$remove(todo);
            $scope.msg = "Todo Removed"
        }
    //clear scope fields
    function clearFields(){
        console.log('clearing all fields...');
        
        $scope.title= '';
        $scope.author = '';
        $scope.description = '';
    }
    
}]);