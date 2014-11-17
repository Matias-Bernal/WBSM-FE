'use strict';

angular.module('Wbpms')
  .controller('HomeCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {
	
        $scope.user.username; //username of the user
		
        $scope.user.name; //name of the user		
		
        $scope.user.surname; //surname of the user		
		
        $scope.user.email; //email of the user		
		
        $scope.user.project[]; //projects of the user
		
        $scope.project.iterations[]; //iterations of the project		
		
        $scope.project.members[]; //members of the project		
		
        $scope.iteration.workItem[]; //members of the project		
        
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      var init = function() {
      };
	  
      //function view user projects        
      $scope.viewUserProject = function (userId){   		
        
      }	  
		
      //function view project iterations
      $scope.viewProjectIteration = function (iterationId){   	  
        
      }	  		
		
      //function view project members
      $scope.viewProjectMember = function (projectId){        
        
      }	  				
		
      //function view iteration workItems
      $scope.viewIterationWorkItem = function (iterationId){        
        
      }	  		
        
    }
  ]);