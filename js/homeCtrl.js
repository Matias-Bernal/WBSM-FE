'use strict';

angular.module('Wbpms')
  .controller('HomeCtrl', ['$scope', '$http', '$log', 'UserData', 'ProjectData', 'IterationData',
    function ($scope, $http, $log, UserData, ProjectData, IterationData) {
	
        //Global User Data
        $scope.usuario = UserData;  

        //Global Project Data
        $scope.proyecto = ProjectData;  

        //Global Iteration Data
        $scope.iteracion = IterationData;          

        $scope.projects = [];    

        $scope.iterations = [];           

        $scope.work_Items = [];        

        $scope.members = [];                            

        // declaration !AND! call (see parenthesis at end of function)
        // of a function that fetches the projects from the server
        $scope.init = function() {
        // Get all projects of a User
          
          var payload = {
              user_email_id : $scope.usuario.email
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.post('/api/users/getprojects/', payload)                  
            .success(function(data, status, header, config) {
              $log.debug('Success fetching projects from server');
              $scope.projects = data[0].projects;             

              for(var i =0; i < $scope.projects.length; i++) {

                // List all iterations of each project
                var payload2 = {
                  project_name : $scope.projects[i].project_name
                }

                $log.debug("Sending payload: " + JSON.stringify(payload2));

                // send the payload to the server
                $http.post('/api/projects/iterations/getprojectiterations', payload2)                  
                  .success(function(data, status, header, config) {
                    $log.debug('Success fetching projects from server');
                    $scope.iterations = data[0].iterations;                    

                    for(var j =0; j < $scope.iterations.length; j++) {

                      // List all members of each project
                      var payload3 = {
                        project_name : payload2.project_name,
                        iteration_number : $scope.iterations[j].id_iteration
                      }

                      $log.debug("Sending payload: " + JSON.stringify(payload3));

                      // send the payload to the server
                      $http.post('api/projects/iterations/getworkitems', payload3)                  
                        .success(function(data, status, header, config) {
                          $log.debug('Success fetching projects from server');
                          $scope.work_Items = data[0].work_Items;
                      })
                        .error(function(data, status) {
                          $log.debug('Error while fetching projects from server');
                      });  
                    }

                })
                  .error(function(data, status) {
                    $log.debug('Error while fetching projects from server');
                });  

                // List all members of each project
                var payload4 = {
                  project_name_id : $scope.projects[i].project_name
                }

                $log.debug("Sending payload: " + JSON.stringify(payload4));

                // send the payload to the server
                $http.post('/api/projects/getmembers/', payload4)                  
                  .success(function(data, status, header, config) {
                    $log.debug('Success fetching projects from server');
                    $scope.iterations = data[0].iterations;
                })
                  .error(function(data, status) {
                    $log.debug('Error while fetching projects from server');
                });   

              } 

            })
            .error(function(data, status) {
              $log.debug('Error while fetching projects from server');
            }); 
        
        }    

        $scope.goToWorkItems = function(project_name, iteration_number) {
        // Go to Work Items 
    
          $scope.proyecto.project_name = project_name; 
          $scope.iteracion.id_iteration = iteration_number;          

          window.location.href = '#/projects/iterations/work_items';          
    
        }  

        $scope.goToMembers = function(project_name) {
        // Go to Members 
    
          $scope.proyecto.project_name = project_name; 

          window.location.href = '#/projects/members';          
    
        }  
        
    }
  ]);