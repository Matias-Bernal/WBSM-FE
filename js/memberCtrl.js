'use strict';

angular.module('Wbpms')
  .controller('MemberCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {
        
        $scope.newUser = {
            name: '',
            eMailMember :'',
            point:'',
            owner: false,
        }
        
        $scope.members = []; //members
    
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      var init = function(projectId) {
          $http.get('/api/projects/'+projectId)
          .success(function(data, status, header, config) {
            
            // the server should return a json array which contains all the todos
            $scope.members = data;
          })
          .error(function(data, status) {
            $log.debug('Error while fetching todos from server');
          });
          
      };
        
        //Function view project members
        
        $scope.getMembers = function (projectNameId){
        $log.debug("View project member " + projectId);

        $http.post('/api/project/'+projectId)
          .success(function(data, status, header, config) {
            $log.debug('Success get member');
            $scope.members = data;
 
          })
          .error(function(data, status) {
            $log.debug('Error while trying get project user on server');
          });
        
        }
        
        //Function add a member in the project list
        $scope.addNewMember = function(eMail) {
        $log.debug("Add member " + eMail);

        $http.post('/api/project/'+eMail)
          .success(function(data, status, header, config) {
            $log.debug('Success add member');
            $scope.newUser = data;
 
          })
          .error(function(data, status) {
            $log.debug('Error while trying to add user on server');
          });
        }
        
        //Function remove a member from the project
        $scope.removeMember = function(projectId,emailMember) {
        $log.debug("Removing member " + eMail);

        $http.delete('/api/project/'+projectId+'/'+emailMember)
          .success(function(data, status, header, config) {
            $log.debug('Success removing member');
            
             // find the element in the data array and remove it
            for(var i =0; i < $scope.members.length; i++) {
                if($scope.members[i].id_member === idMember) {
                    $scope.members.splice(i, 1);
                }
            }
          })
          .error(function(data, status) {
            $log.debug('Error while trying to remove todo item on server');
          });
        }
        
        //Function promote owner
        $scope.promoteOwner = function(owner){
        
            $scope.owner = true;
        
        }
        
        //Function owner member downgrade
        $scope.ownerMemberDowngrade = function(owner){
            
            $scope.owner = false;
            
        }
        
        
        
    }
  ]);