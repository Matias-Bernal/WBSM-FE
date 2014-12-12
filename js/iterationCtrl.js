'use strict';

angular.module('Wbpms')
  .controller('IterationCtrl', ['$scope', '$http', '$log','ProjectData','IterationData',
    function ($scope, $http, $log, ProjectData, IterationData) {

       $scope.project = ProjectData;
       $scope.iterationD = IterationData;
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
            project_name : '',
            iteration_number : ''
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
        $http.post('/api/projects/iterations/getprojectiterations', payload)
           .success(function(data, status, header, config) {
            alert(JSON.stringify(data));
            $scope.iterations = data[0].iterations;
          })   
          .error(function(data, status) {
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
              project_name : nameProject,
              iteration_number : idIteration
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.post('api/projects/iterations/delete', payload)
            .success(function(data, status, header, config) {
              $log.debug('Success remove iteration');
              alert("The Iteration was deleted");
              for(var i =0; i < $scope.iterations.length; i++) {
                if($scope.iterations[i].iteration_number === delIteration.iteration_number) {
                  $scope.iterations.splice(i, 1);
                  break;
                }
              }

            })
            .error(function(data, status) {
              $log.debug('Error while trying to remove new iteration');
              alert("Error deleting iteration");
            }); 
        }

      $scope.loadWorkItems = function(nameProject, idIteration){

          // List all work Items of an iteration
          var payload3 = {
            project_name : nameProject,
            iteration_number : idIteration
          }

          // send the payload to the server
          $http.post('/api/projects/iterations/getworkitems', payload3)                  
            .success(function(data, status, header, config) {
              $scope.workitems = data;
          })
            .error(function(data, status) {
              alert('Error while fetching work Items from server'); 
          });                

        }



      $scope.goToWorkItems = function(iteration) {
        // Go to workItems 
          $scope.iterationD.id_iteration = iteration.iteration_number,
          $scope.iterationD.title_iteration = iteration.title,
          $scope.iterationD.point_iteration = iteration.points,
          
          window.location.href = '#/projects/iterations/work_items';          
    
        }   

  }]);