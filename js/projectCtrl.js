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

        //Add project messagges //
        $scope.addSuccessMsgVisible = false;
        $scope.addErrorMsgVisible = false;
        //Rename project messagges //
        $scope.renameSuccessMsgVisible = false;
        $scope.renameErrorMsgVisible = false;
        //Remove project messagges //
        $scope.removeSuccessMsgVisible = false;
        $scope.removeErrorMsgVisible = false;        

        
        // declaration !AND! call (see parenthesis at end of function)
        // of a function that fetches the projects from the server
        $scope.init = function() {
        // Get all projects of a User

          if($scope.usuario.email === '')
              window.location.href = '#/login';
          else                  
            
              var payload = {
                  user_email_id : $scope.usuario.email
              }

              // send the payload to the server
              $http.post('/api/users/getprojects', payload)                  
                .success(function(data, status, header, config) {
                  $scope.projects = data[0].projects;
                })
                .error(function(data, status) {
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
              $scope.addSuccessMsgVisible = true;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = false;                                        
            })          

            .error(function(data, status) {  
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = true;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = false;                          
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
              for(var i =0; i < $scope.projects.length; i++) {
                if($scope.projects[i].project_name === oldnameProject) {
                  $scope.projects[i].project_name = newnameProject;
                  break;
                }
              }  
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = true;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = false;                          
            })
            .error(function(data, status) { 
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = true;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = false;                          
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
              for(var i =0; i < $scope.projects.length; i++) {
                if($scope.projects[i].project_name === delnameProject) {
                  $scope.projects.splice(i, 1);
                  break;
                }
              }   
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = true;
              $scope.removeErrorMsgVisible = false;                            
            })
            .error(function(data, status) {
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = true;                 
            });		         
		
        }	


        $scope.goToIterations = function(project_name) {
        // Go to Iterations 
    
          $scope.proyecto.project_name = project_name;          

          window.location.href = '#/projects/iterations';          
    
        }     

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