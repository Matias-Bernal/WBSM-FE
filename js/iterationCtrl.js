'use strict';

angular.module('Wbpms')
  .controller('IterationCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {
        
      $scope.newIteration = {
           idProject:'',
           idIteration: ''
      }
        
      $scope.iterations = []; //iterations of the project

      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      var init = function(idProject) {
      	  $http.get('/api/projects/'+idProject)
      	  .success(function(data, status, header, config) {

          // the server should return a json array wich contains all the iterations
          $scope.iterations = data

          })
          .error(function(data, status){	
            $log.debug('Error while fetching iterations from server');
          });
      
          $http.get('/api/projects/iterations'+idProject)
          .success(function(data, status, header, config) {
            
            // the server should return a json array which contains all the iterations
            $scope.projectIterations = data;
          })
          .error(function(data, status) {
            $log.debug('Error while fetching iterations from server');
          });
          
      };   

      $scope.getAllProjectIterations = function() {
      	 //shows all iterations of a project
      	    
      } 

      $scope.create_iteration = function(idProject, idIteration) {  	
        //add new iteration to the project
        $log.debug("Add iteration: " +idIteration);

        // send the payload to the server
        $http.post('/api/project/'+idProject+'/'+idIteration)
          .success(function(data, status, header, config) {
            $log.debug('Success add iteration');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to show the iterations of the project');
          }); 

      }

      $scope.delete_iteration = function(projectName, iterationNumber) {
      	// deletes an iteration of a project
      	$http.delete('/api/project/'+idProject+'/'+idIteration)
          .success(function(data, status, header, config) {
            $log.debug('Success removing iteration');
            
             // find the element in the data array and remove it
            for(var i =0; i < $scope.iterations.length; i++) {
                if($scope.iterations[i].id_iteration === idIteration) {
                    $scope.iterations.splice(i, 1);
                }
            }
          })
          .error(function(data, status) {
            $log.debug('Error while trying to remove iteration item on server');
          });
      }
        
    }
  ]);