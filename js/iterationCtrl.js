'use strict';

angular.module('Wbpms')
  .controller('IterationCtrl', ['$scope', '$http', '$log','ProjectData',
    function ($scope, $http, $log, ProjectData) {

       $scope.project = ProjectData;
       $scope.iterations = [];

      /* $scope.iterations  = [
            {
                idIteration:'001',
                title:'Iteration 001',
                point:'00/00'
            },
            {
                idIteration:'002',
                title:'Iteration 002',
                point:'00/00'
            },
            {
                idIteration:'003',
                title:'Iteration 003',
                point:'00/00'
            },
            {
                idIteration:'004',
                title:'Iteration 004',
                point:'00/00'
            }    
        ]; */
        
        
      $scope.iterationModel = {
           idIteration: '',
           title: '',
           point: ''            
      }

      $scope.delIteration = {
            iteration_name : ''
        } 
            
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the iterations from the server
      $scope.init = function() { 
        //Get all iterations of a project
        var payload = {
          project_name : $scope.project.project_name
        }
        $log.debug("Sending payload: " + JSON.stringify(payload));
        // send the payload to the server
        $http.get('/api/projects/iterations', payload)
           .success(function(data, status, header, config) {
            alert(JSON.stringify(data));
            $scope.iterations = data;
            if(data.length > 0) {
              $scope.iterationModel.idIteration = $scope.iterations[0];
            }  
          })   
          .error(function(data, status) {
            alert("ERROR"+ JSON.stringify(data));
            $log.debug('Error while fetching iterations from server');
          });  

      }

     /* 
      $scope.getAllProjectIterations = function() {
      	 //shows all iterations of a project
      	  var payload = {
          project_name : $scope.project.project_name
          }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        //alert(JSON.stringify(data)); 
          // send the payload to the server
          $http.get('/api/projects/iterations', payload)
             .success(function(data, status, header, config) {
              $log.debug('Success fetching iterations from server');
              $scope.iterations = data[0].iterations;
              alert(JSON.stringify(data));  
                })   
            .error(function(data, status) {
              $log.debug('Error while fetching iterations from server');
            });  
      }  */

      $scope.create_iteration = function(nameProject) {  	
        //function add a iteration to the project
        var payload = {
              project_name : nameProject
          }     

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.post('/api/projects/iterations', payload)
            .success(function(data, status, header, config) {
              $log.debug('Success adding new iteration');
              alert("The new Iteration is added");
              $scope.iterations.push(data);
            })          

            .error(function(data, status) {
              alert("ERROR");
              $log.debug('Error while trying to add new iteration');
            });

      }

      $scope.delete_iteration = function(nameProject, idIteration) {
      	// deletes an iteration of a project
         var payload = {
              project_name : delnameProject
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.delete('api/projects/iterations', payload)
            .success(function(data, status, header, config) {
              $log.debug('Success remove iteration');
              alert("The Iteration was deleted");                
            })
            .error(function(data, status) {
              $log.debug('Error while trying to remove new iteration');
            }); 
        }

  }]);