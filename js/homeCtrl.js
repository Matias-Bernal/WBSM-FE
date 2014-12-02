'use strict';

angular.module('Wbpms')
  .controller('HomeCtrl', ['$scope', '$http', '$log', 'UserData',
    function ($scope, $http, $log, UserData) {
	
      $scope.user = { 
            username:'', //username of the user
            name:'', //name of the user
            surname:'', //surname of the user
            email:'', //email of the user	
            project:[], //projects of the user
            iterations:[], //iterations of the project		
		        members:[], //members of the project		
    		    workItem:[] //members of the project		
      }

      $scope.usuario = UserData;   

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