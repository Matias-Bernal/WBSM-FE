'use strict';

angular.module('Wbpms')
  .controller('ProjectCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {	
        
        $scope.successMsgVisible = false;	
        
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      var init = function() {
		// Initialization function that gets the projects from the server	  
      };
	  
	  $scope.addProject = function(nameProject) {
		// Add a new project
		
        var payload = {
            action : 'addProject',
            name : nameproject
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success add project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to add new project');
          });		
		
      }	  
	  
	  $scope.removeProject = function(nameproject) {
		// Remove a new project
		
        var payload = {
            action : 'removeProject',
            name : nameproject
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success remove project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to remove new project');
          });			
		
      }	  	  
	  
	  $scope.renameProject = function(oldnameproject, newnameproject) {
		// Rename a new project
		
        var payload = {
            action : 'renameProject',
            oldname : oldnameproject,
			newname : newnameproject
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success rename project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to rename new project');
          });		
		
      }	  	 

	  $scope.getAllUserProjects = function(userEmail) {
		// Get all the projects of a user
		
        var payload = {
            action : 'getAllUserProject',
            email : userEmail
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success get all the projects of a user');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to get all the projects of a user');
          });		
		
      }	  	 	

	  $scope.getAllProjectMembers = function(memberId, ownerId) {
		// Get all the members and owners of a project
		
        var payload = {
            action : 'getAllProjectMembers',
            members : memberId,
			owners : ownerId
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success get all the members and owners of a project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to get all the members and owners of a project');
          });		
		
      }	  	

	  $scope.getAllProjectOwners = function(nameProject) {
		// Get all the owners of a project
		
        var payload = {
            action : 'getAllProjectOwners',
            name : nameProject
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success get all the owners of a project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to get all the owners of a project');
          });		
		
      }	  	

	  $scope.addMemberToProject = function(nameProject, userEmail, isOwner) {
		// Add a member or an owner to a project
		
        var payload = {
            action : 'getAllProjectOwners',
            name : nameProject,
			email : userEmail,
			isOwner : isOwner
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success Add a member or an owner to a project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to Add a member or an owner to a project');
          });		
		
      }	  	

	  $scope.removeMemberFromProject = function(nameProject, userEmailRemoved, userEmailRemover) {
		// Remove a member from a project
		
        var payload = {
            action : 'getAllProjectOwners',
            name : nameProject,
			removed : userEmailRemoved,
			remover : userEmailRemover
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success Remove a member from a project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to Remove a member from a project');
          });		
		
      }		  
        
    }
  ]);