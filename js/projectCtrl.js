'use strict';

angular.module('Wbpms')
  .controller('ProjectCtrl', ['$scope', '$http', '$log', 'UserData', 'ProjectData',
    function ($scope, $http, $log, UserData, ProjectData) {	

        //Global User Data
        $scope.usuario = UserData;  

        //Global Project Data
        $scope.proyecto = ProjectData;    

        // we store all data in the data array
        $scope.projects = [];
                           
        $scope.projectModel = [{
            description: '',
            point: ''
        }];
        
        $scope.newProject = {
            new_project_name : ''
        }        

        $scope.newNameProject = {
            old_project_name : '',
            new_new_project_name : ''
        }             

        $scope.delProject = {
            project_name : ''
        }        

        
        // declaration !AND! call (see parenthesis at end of function)
        // of a function that fetches the projects from the server
        $scope.init = function() {
        // Get all projects of a User
          
          var payload = {
              user_email_id : $scope.usuario.email
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.get('/api/users/projects', payload)                  
            .success(function(data, status, header, config) {
              $log.debug('Success fetching projects from server');
              $scope.projects = data[0].projects;
            })
            .error(function(data, status) {
              $log.debug('Error while fetching projects from server');
            }); 
        
        }    

        
        $scope.addProject = function(projectName) {
		    // Add a new project          
        
          var payload = {
              project_name : projectName
          }     

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.post('/api/projects', payload)
            .success(function(data, status, header, config) {
              $log.debug('Success adding new project');
              $scope.projects.push(data);
              alert("The Project was added");                            
            })          

            .error(function(data, status) {
              $log.debug('Error while trying to add new project');
              alert("Error adding project");              
            });	           
		
        }	 


        $scope.renameProject = function(oldnameProject,newnameProject) {
        // Rename a new project 
    
          var payload = {
              project_name_id : oldnameProject,
              new_project_name_id : newnameProject
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.post('/api/projects/update', payload)
            .success(function(data, status, header, config) {
              $log.debug('Success rename project');
              alert("The Project was renamed");              
            })
            .error(function(data, status) {
              $log.debug('Error while trying to rename new project');
              alert("Error renaming project");               
            });             
    
        }        

	  
        $scope.removeProject = function(delnameProject) {
		    // Remove a new project	
    
          var payload = {
              project_name_id : delnameProject
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.delete('/api/projects', payload)
            .success(function(data, status, header, config) {
              $log.debug('Success remove project');
              alert("The Project was deleted");                
            })
            .error(function(data, status) {
              $log.debug('Error while trying to remove new project');
              alert("Error deleting project");                
            });		         
		
        }	


        $scope.goToIterations = function(project_name) {
        // Go to Iterations 
    
          $scope.proyecto.project_name = project_name; 

          window.location.href = '#/projects/iterations';          
    
        }         

        $scope.goToWorkItems = function(project_name) {
        // Go to Work Items 
    
          $scope.proyecto.project_name = project_name; 

          window.location.href = '#/projects/iterations/work_items';          
    
        }  

        $scope.goToMembers = function(project_name) {
        // Go to Members 
    
          $scope.proyecto.project_name = project_name; 

          window.location.href = '#/projects/members';          
    
        }                      
        
    }
  ]);