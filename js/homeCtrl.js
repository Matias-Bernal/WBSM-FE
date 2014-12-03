'use strict';

angular.module('Wbpms')
  .controller('HomeCtrl', ['$scope', '$http', '$log', 'UserData',
    function ($scope, $http, $log, UserData) {
	
        $scope.usuario = UserData; 

        $scope.projects = [];        

        $scope.projectModel = [{
            nameP: ''
        }];

        $scope.iterations = [];        

        $scope.iterationModel = [{
            nameI: ''
        }];         

        $scope.work_Items = [];        

        $scope.workItemModel = [{
            nameW: ''
        }];    

        $scope.members = [];        

        $scope.memberModel = [{
            nameM: ''
        }];                            

        // declaration !AND! call (see parenthesis at end of function)
        // of a function that fetches the projects from the server
        $scope.init = function() {
        // Get all projects of a User
          
          var payload = {
              user_email_id : $scope.usuario.email
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.get('/api/projects/members/'+$scope.usuario.email, payload)        
            .success(function(data, status, header, config) {
              $log.debug('Success fetching projects from server');
              $scope.projects = data;
                if(data.length > 0) {
                  $scope.projectModel.nameP = $scope.projects[0];
                }             
            })
            .error(function(data, status) {
              $log.debug('Error while fetching projects from server');
            }); 
        
        }   
		
        //function view project iterations
        $scope.viewProjectIteration = function (projectId){

          var payload = {
              project_name_id : projectId
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.get('/api/projects/iterations', payload)        
            .success(function(data, status, header, config) {
              $log.debug('Success fetching iterations from server');
              $scope.iterations = data;
                if(data.length > 0) {
                  $scope.iterationModel.description = $scope.iterations[0];
                }             
            })
            .error(function(data, status) {
              $log.debug('Error while fetching iterations from server');
            });            	  
        
        }	  		
		

        //function view iteration workItems
        $scope.viewIterationWorkItem = function (iterationId){          

          var payload = {
              iteration_number : iterationId
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.get('/api/projects/iterations/workitems', payload)        
            .success(function(data, status, header, config) {
              $log.debug('Success fetching iterations from server');
              $scope.work_Items = data;
                if(data.length > 0) {
                  $scope.workItemModel.description = $scope.work_Items[0];
                }             
            })
            .error(function(data, status) {
              $log.debug('Error while fetching iterations from server');
            });                  
        
        }	  				


        //function view project members
        $scope.viewProjectMember = function (projectId){  

          var payload = {
              project_name_id : projectId
          }

          $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.get('/api/projects/members', payload)        
            .success(function(data, status, header, config) {
              $log.debug('Success fetching iterations from server');
              $scope.members = data;
                if(data.length > 0) {
                  $scope.memberModel.description = $scope.members[0];
                }             
            })
            .error(function(data, status) {
              $log.debug('Error while fetching iterations from server');
            });             
        
        }	  		
        
    }
  ]);