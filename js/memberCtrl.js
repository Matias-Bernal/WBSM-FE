'use strict';

angular.module('Wbpms')
  .controller('MemberCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {
        
        $scope.newMember = {
            eMailMember :''
        }
        
        $scope.members = []; //members of the project
    
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      var init = function(idProject) {
          $http.get('/api/projects/'+idProject)
          .success(function(data, status, header, config) {
            
            // the server should return a json array which contains all the todos
            $scope.members = data;
          })
          .error(function(data, status) {
            $log.debug('Error while fetching todos from server');
          });
          
          $http.get('/api/projects/members'+idProject)
          .success(function(data, status, header, config) {
            
            // the server should return a json array which contains all the todos
            $scope.teamMembers = data;
          })
          .error(function(data, status) {
            $log.debug('Error while fetching todos from server');
          });
          
      };
        
        //function view project member
        
        $scope.viewProjectMember = function (idMember){
        
        
        }
        
        //function add a member in the list the members
        $scope.addNewMember = function(idProject,idMember) {
        $log.debug("Add member " + emailMember);

        $http.post('/api/project/'+idProject+'/'+idMember)
          .success(function(data, status, header, config) {
            $log.debug('Success add member');
 
          })
          .error(function(data, status) {
            $log.debug('Error while trying to remove todo item on server');
          });
        }
        
        //function remove a member from the project
        $scope.removeMember = function(idProject,idMember) {
        $log.debug("Removing Member " + idMember);

        $http.delete('/api/project/'+idProject+'/'+idMember)
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
        
        //function promove owner
        $scope.promoveOwner = function(){
        
        
        }
        
        
        
        
    }
  ]);