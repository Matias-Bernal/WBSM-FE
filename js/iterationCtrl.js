'use strict';

angular.module('Wbpms')
  .controller('IterationCtrl', ['$scope', '$http', '$log','ProjectData','IterationData', 'UserData',
    function ($scope, $http, $log, ProjectData, IterationData, UserData) {

       $scope.project = ProjectData;
       $scope.iterationD = IterationData;
       $scope.iterations = [];

       //Global User Data
       $scope.usuario = UserData;
        
      $scope.iterationModel = {
           idIteration: '',
           title: '',
           point: ''            
      }

      $scope.delIteration = {
            project_name : '',
            iteration_number : ''
        } 


      //Add project messagges //
      $scope.addSuccessMsgVisible = false;
      $scope.addErrorMsgVisible = false;
      //Remove project messagges //
      $scope.removeSuccessMsgVisible = false;
      $scope.removeErrorMsgVisible = false;          
            
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the iterations from the server
      $scope.init = function() { 
        //Get all iterations of a project

          if($scope.usuario.email === '')
              window.location.href = '#/login';
          else              
              var payload = {
                project_name : $scope.project.project_name
              }
              $log.debug("Sending payload: " + JSON.stringify(payload));
              // send the payload to the server
              $http.post('/api/projects/iterations/getprojectiterations', payload)
                 .success(function(data, status, header, config) {
                  $scope.iterations = data[0].iterations;
                })   
                .error(function(data, status) {
                  $log.debug('Error while fetching iterations from server');
                });  

      }

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
              $scope.iterations.push(data);
              $scope.addSuccessMsgVisible = true;
              $scope.addErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = false;                                        
            })          

            .error(function(data, status) {  
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = true;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = false;                          
            });  

      }

      $scope.delete_iteration = function(idIteration) {
      	// deletes an iteration of a project
         var payload = {
              project_name : $scope.project.project_name,
              iteration_number : idIteration
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));
          // send the payload to the server
          $http.post('/api/projects/iterations/delete', payload)
            .success(function(data, status, header, config) {
              $log.debug('Success remove iteration');
              for(var i =0; i < $scope.iterations.length; i++) {
                if($scope.iterations[i].iteration_number === idIteration) {
                  $scope.iterations.splice(i, 1);
                  break;
                }
              }
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = true;
              $scope.removeErrorMsgVisible = false;                            
            })
            .error(function(data, status) {
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = true;                 
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
          });                

        }



      $scope.goToWorkItems = function(iteration) {
        // Go to workItems 
          $scope.iterationD.id_iteration = iteration.iteration_number,
          $scope.iterationD.title_iteration = iteration.title,
          $scope.iterationD.point_iteration = iteration.points,
          
          window.location.href = '#/projects/iterations/work_items';          
    
        }

        $scope.setDelete = function(idIteration) {
        // Set project name to Delete

          $scope.delIteration.iteration_number = idIteration;

        }
   

  }]);