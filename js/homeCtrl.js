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

        $scope.workitems = [];        

        $scope.members = [];                            

        // declaration !AND! call (see parenthesis at end of function)
        // of a function that fetches the projects from the server
        $scope.init = function() {
        // Get all projects of a User
          
          var payload = {
              user_email_id : $scope.usuario.email
          }

          // send the payload to the server
          $http.post('/api/users/getprojects', payload)                  
            .success(function(data, status, header, config) {
              $scope.projects = data[0].projects;   
            })  
            .error(function(data, status) {
              alert('Error while fetching projects from server');
            }); 
        
        }    

        $scope.loadIterations = function(project_name){

        // List all iterations of each project
          var payload2 = {
              project_name : project_name
          };

          // send the payload to the server
          $http.post('/api/projects/iterations/getprojectiterations', payload2)                  
            .success(function(data, status, header, config) {
              $scope.iterations.iterations = data[0].iterations;
              $scope.iterations.project = project_name;              
            })  
            .error(function(data, status) {
              alert('Error while fetching iterations from server');
            });                

        }

        $scope.loadWorkItems = function(project_name, iteration_number){

          // List all work Items of an iteration
          var payload3 = {
            project_name : project_name,
            iteration_number : iteration_number
          }

          // send the payload to the server
          $http.post('/api/projects/iterations/getworkitems', payload3)                  
            .success(function(data, status, header, config) {
              $scope.workitems.workitems = data;
              $scope.workitems.project = project_name;                            
              $scope.workitems.iteration = iteration_number;                                          
          })
            .error(function(data, status) {
              alert('Error while fetching work Items from server'); 
          });                

        }     

        $scope.loadMembers = function(project_name){

          // List all members of each project
          var payload4 = {
            project_name_id : project_name
          }

          // send the payload to the server
          $http.post('/api/projects/getmembers', payload4)                  
            .success(function(data, status, header, config) {
              $scope.members.members = data[0].members;
              $scope.members.project = project_name;
          })
            .error(function(data, status) {
              alert('Error while fetching members from server');
          });                

        }   

        $scope.goToWorkItems = function(project_name, iteration_number, title, points) {
        // Go to Work Items 
    
          $scope.proyecto.project_name = project_name; 
          $scope.iteracion.id_iteration = iteration_number;    
          $scope.iteracion.title_iteration = title;
          $scope.iteracion.point_iteration = points;                

          window.location.href = '#/projects/iterations/work_items';          
    
        }  

        $scope.goToMembers = function(project_name) {
        // Go to Members 
    
          $scope.proyecto.project_name = project_name; 

          window.location.href = '#/projects/members/view';          
    
        }  
        
    }
  ]);