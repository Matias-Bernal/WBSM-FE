'use strict';

angular.module('Wbpms')
  .controller('MemberCtrl', ['$scope', '$http', '$log', 'UserData' , 'ProjectData' , 'IterationData','SearchMemberData',
    function ($scope, $http, $log, UserData, ProjectData, IterationData,SearchMemberData) {
        
        
        $scope.iteration = IterationData;
        $scope.project = ProjectData;
        $scope.eMailUser = UserData;
        $scope.members = [];
        $scope.searcMember = SearchMemberData
        
        $scope.listEmail = {
            project_email : ''
        }        
        
        $scope.setDeleteUser = function(eMail) {
        // Set project user to Delete
            $scope.listEmail.project_email = eMail;
        }
        $scope.newUser = {
            name: '',
            eMailMember :'',
            owner: false
        }

    
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      
        $scope.init = function() {
          
          var payload = {
              project_name_id: $scope.project.project_name
          }
          $log.debug("Sending payload: " + JSON.stringify(payload));
          $http.post('/api/projects/getmembers', payload)

          .success(function(data, status, header, config) {
            alert(JSON.stringify(data[0].members));
            $scope.members = data[0].members;
          })
          .error(function(data, status) {
            $log.debug(data.error);
          });   
      }
        
         //Function add a member in the project list
        $scope.add_member_to_projects = function(idProject,eMailUser) {
            alert($scope.idProject);
            alert($scope.eMailUser);   
            var payload = {
                project_name_id: idProject,
                user_email_id: eMailUser
            }
            
           $log.debug("Sending payload: " + JSON.stringify(payload));
            $http.post('/api/projects/members/add', payload)
              .success(function(data, status, header, config) {
                $log.debug('Success: New member <user_email_id> added successfully to <project_name_id>');
                alert(JSON.stringify(data));
                $scope.members.push(data);
              })
              .error(function(data, status) {
                //$log.debug(data.error);
                 alert("The new member is not added");
                $log.debug('Error while trying to add new member to the project');
              });
            
        }
        
        //Function view project members 
        $scope.get_all_project_members = function() {
            
            var payload = {
                project_name_id: $scope.project.project_name
            }
            alert(JSON.stringify(payload));
            $log.debug("Sending payload: " + JSON.stringify(payload));
            $http.post('/api/projects/getmembers', payload)
              .success(function(data, status, header, config) {
                $log.debug('Member added successfully from project'); 
                // the server should return a json array which contains all the todos
                if ($scope.members.owner === 0){
                    $scope.members.owner = false
                } else {
                    $scope.members.owner = true
                };
                $scope.members = data[0].members;
              })
              .error(function(data, status) {
                alert("error");
                $log.debug(data.error);
              }); 
        }
        
        //Function remove a member from the project
        $scope.remove_member_from_project = function(idProject,eMailUser) {
    
             var payload = {
                project_name_id: idProject,
                user_email_id: eMailUser
            }
            
            $log.debug("Sending payload: " + JSON.stringify(payload));
            $http.post('/api/projects/members/remove', payload)
              .success(function(data, status, header, config) {
                $log.debug('Member <Member> removed successfully from project'); 
                 // find the element in the data array and remove it
                for(var i =0; i < $scope.members.length; i++) {
                    if($scope.members[i].email === payload.user_email_id) {
                        $scope.members.splice(i, 1);
                    }
                }
              })
              .error(function(data, status) {
                $log.debug(data.error);
              });
        }
        
        //Function promote owner
        $scope.promote_owner = function(idProject,eMailUser){ 
            
             var payload = {
                project_name_id: idProject,
                user_email_id: eMailUser
            }
             
            $log.debug("Sending payload: " + JSON.stringify(payload));
            $http.post('/api/projects/members/promote', payload)
                .success(function(data, status, header, config) {
                $log.debug('New owner <owner> added successfully to <id_project>');
                for(var i =0; i < $scope.members.length; i++){
                    if($scope.members[i].user == eMailUser) {
                        if (!$scope.members[i].owner){
                            $scope.members[i].owner = true;
                        }
                    };
                };
 
                })
                .error(function(data, status) {
                    $log.debug(data.error);     
                });
        }
        
        //Function Downgrader owner
        $scope.ownerMemberDowngrader = function(idProject,eMailUser){ 
            
             var payload = {
                project_name_id: idProject,
                user_email_id: eMailUser
            }
            $log.debug("Sending payload: " + JSON.stringify(payload));
            $http.post('/api/projects/members/downgrade', payload)
              .success(function(data, status, header, config) {
                $log.debug('Downgrade owner <owner> successfully to <id_project>');
                 for(var i =0; i < $scope.members.length; i++){
                    if($scope.members[i].user == eMailUser) {
                        if ($scope.members[i].owner){
                            $scope.members[i].owner = false;
                        }
                    };
                };
              })
          .error(function(data, status) {
            $log.debug(data.error);   
          });
        }
        
       
    }

    ]);