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

          // send the payload to the server
          $http.post('/api/users/getprojects', payload)                  
            .success(function(data, status, header, config) {
              $scope.projects = data[0].projects;
            })
            .error(function(data, status) {
              alert('Error while fetching projects from server');
            }); 
        
        }    

        
        $scope.addProject = function(projectName) {
		    // Add a new project          
        
          var payload = {
              project_name : projectName
          }     

          // send the payload to the server
          $http.post('/api/projects', payload)
            .success(function(data, status, header, config) {
              $scope.projects.push(data);
              alert("The Project was added");                            
            })          

            .error(function(data, status) {
              alert("Error adding project");              
            });	           
		
        }	 


        $scope.renameProject = function(oldnameProject,newnameProject) {
        // Rename a new project 
    
          var payload = {
              project_name_id : oldnameProject,
              new_project_name_id : newnameProject
          }

          // send the payload to the server
          $http.post('/api/projects/update', payload)
            .success(function(data, status, header, config) {
              alert("The Project was renamed");   
              for(var i =0; i < $scope.projects.length; i++) {
                if($scope.projects[i].project_name === oldnameProject) {
                  $scope.projects[i].project_name = newnameProject;
                  break;
                }
              }           
            })
            .error(function(data, status) {
              alert("Error renaming project");               
            });             
    
        }        

	  
        $scope.removeProject = function(delnameProject) {
		    // Remove a new project	
    
          var payload = {
              project_name : delnameProject
          }

          // send the payload to the server
          $http.post('/api/projects/remove', payload)
            .success(function(data, status, header, config) {        
              alert("The Project was deleted");                
              for(var i =0; i < $scope.projects.length; i++) {
                if($scope.projects[i].project_name === delnameProject) {
                  $scope.projects.splice(i, 1);
                  break;
                }
              }              
            })
            .error(function(data, status) {
              alert("Error deleting project"); 
            });		         
		
        }	


        $scope.goToIterations = function(project_name) {
        // Go to Iterations 
    
          $scope.proyecto.project_name = project_name;          

          window.location.href = '#/projects/iterations';          
    
        }         

/*        $scope.goToWorkItems = function(project_name) {
        // Go to Work Items 
    
          $scope.proyecto.project_name = project_name; 

          window.location.href = '#/projects/iterations/work_items';          
    
        }  */

        $scope.goToMembers = function(project_name, points, owner) {
        // Go to Members 
    
          $scope.proyecto.project_name = project_name; 
          $scope.proyecto.points = points;            
          $scope.proyecto.owner = owner;           

          window.location.href = '#/projects/members';          
    
        }  

        $scope.setDelete = function(project_name) {
        // Set project name to Delete

          $scope.delProject.project_name = project_name;

        }

        $scope.setRename = function(project_name) {
        // Set project name to Delete

          $scope.newNameProject.old_project_name = project_name;

        }        
        
    }
  ]);