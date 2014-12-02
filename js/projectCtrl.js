'use strict';

angular.module('Wbpms')
  .controller('ProjectCtrl', ['$scope', '$http', '$log', 'UserData',
    function ($scope, $http, $log, UserData) {	

        $scope.usuario = UserData;      
        
        $scope.projects = [{
            description:'Project1',
            point:'100'}, 
            {
            description:'Project2',
            point:'200'},
            {
            description:'Project3',
            point:'300'},
            {
            description:'Project4',
            point:'400'},
            {
            description:'Project5',
            point:'500'}            
        ];

        // we store all data in the data array
        //$scope.projects = [];
                           
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
      var init = function() {
          
        var payload = {
            username : UserData.email
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.get('/api/projects/UserData.email}', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success fetching projects from server');
             $scope.projects = data.success;
            if(data.length > 0) {
              $scope.projectModel.description = $scope.projects[0];
            }             
          })
          .error(function(data, status) {
            $log.debug('Error while fetching projects from server');
          }); 
        
      };    
                   
        
	  $scope.addProject = function(projectName) {
		// Add a new project          
        //  alert("Project has been created!");
        //  window.location.href = '#/projects';          
		
        
        //    var payload = {
        //        name : _newProject.new_project_name
        //    }       

        var payload = $scope.newProject;

        //$log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/projects/{newProject.new_project_name}', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success adding new project');
            $scope.projects.push(data)
            alert("Se agrego proyecto con exito!!!")
          })          

          .error(function(data, status) {
            $log.debug('Error while trying to add new project');
          });		
           
		
      }	 

    $scope.renameProject = function(_oldNameProject, _newNameProject) {
    // Rename a new project
          alert("Project has been renowned!");
          window.location.href = '#/projects';          
    
/*    
        var payload = {
            oldname : _oldNameProject.old_project_name,
            newname : _newNameProject.new_new_project_name
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl/{project_name_id}', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success rename project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to rename new project');
          });   
*/          
    
      }        
	  
	  $scope.removeProject = function(_delProject) {
		// Remove a new project
          alert("Project has been deleted!");
          window.location.href = '#/projects';      
		
/*    
        var payload = {
            name : _delProject.project_name
        }

        $log.debug("Sending payload: " + JSON.stringify(payload));

        // send the payload to the server
        $http.post('/api/project_ctrl/{project_name_id}', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success remove project');
          })
          .error(function(data, status) {
            $log.debug('Error while trying to remove new project');
          });			
*/          
		
      }	
        
    }
  ]);