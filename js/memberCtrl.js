'use strict';

angular.module('Wbpms')
  .controller('MemberCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {
        
        $scope.id_project;
        $scope.members = [
            {
                name:'marcelo',
                eMailMember:'qqq@gmail.com',
                point:'100',
                owner: false
            },
            {
                name:'matias',
                eMailMember:'qqq@gmail.com',
                point:'300',
                owner: false
            },
            {
                name:'nico',
                eMailMember:'qqq@gmail.com',
                point:'150',
                owner: false
            },
            {
                name:'guille',
                eMailMember:'qqq@gmail.com',
                point:'200',
                owner: false
            }
        ];

        $scope.newUser = {
            name: '',
            eMailMember :'',
            point:'',
            owner: false
        }

    
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server

      $scope.init = function() {
         /* $http.get('/api/projects/'+projectId)

      var init = function(projectId) {
          $http.get('/api/projects/'+projectId)

          .success(function(data, status, header, config) {
            
            // the server should return a json array which contains all the todos
            $scope.members = data;
          })
          .error(function(data, status) {
            $log.debug('Error while fetching todos from server');
          });*/   
      };
        
        
         //Function add a member in the project list
        $scope.add_member_to_projects = function() {
            alert("member agree to project");
            window.location.href = '#/projects/members';  
            
           /* var payload = {
                project_name_id: id_project,
                user_email_id: eMailMember
            }
            
            $log.debug("Add member");

            $http.post('/api/project/', payload)
              .success(function(data, status, header, config) {
                $log.debug('Success: Member ' <$scope.name> 'added successfully from ' <$scope.id_project>''),
                $scope.newUser = data;

              })
              .error(function(data, status) {
                $log.debug(data.error);
              });*/
            
        }
        
        //Function view project members 
        $scope.get_all_project_members = function() {
            
            alert("get members to project");
            window.location.href = '#/projects/members';
            
            /*var payload = {
                project_name_id: id_project,
            }
            
            $log.debug("View project member");
            $http.post('/api/project/', payload)
                .success(function(data, status, header, config) {
                    $log.debug('Success get members');
                    $scope.members = data;
                })
                .error(function(data, status) {
                    $log.debug(data.error);
                });*/
        }
        
       
        
        //Function remove a member from the project
        $scope.remove_member_from_project = function() {
            
            alert("member remove to project");
            window.location.href = '#/projects/members';
        /*    
             var payload = {
                project_name_id: id_project,
                user_email_id: eMailMember
            }
            
            $log.debug("Removing member");
            
             // find the element in the data array and remove it
                for(var i =0; i < $scope.members.length; i++) {
                    if($scope.members[i].eMailMember === user_email_id) {
                        $scope.members.splice(i, 1);
                    }
                }

            $http.delete('/api/project/{{projcet_name_id}}/{{user_email_id}}')
              .success(function(data, status, header, config) {
                $log.debug('Success removing member');   
              })
              .error(function(data, status) {
                $log.debug(data.error);
              });*/
        }
        
        //Function promote owner
        $scope.promote_owner = function(){ 
            alert("member promote owner to project");
            window.location.href = '#/projects/members';
            
           /*  var payload = {
                project_name_id: id_project,
                user_email_id: eMailMember
            }
            $log.debug("Promote owner");

            $http.post('/api/project/', payload)
              .success(function(data, status, header, config) {
                $log.debug('Success:New owner added successfully to  <$scope.id_project>')
                    if($scope.members.owner == false) {
                        $scope.members = true;
                    } else {
                        $scope.members = false;
                    }

              })
          .error(function(data, status) {
            $log.debug(data.error);
               
          });
        }*/
        
       
    }

    }]);