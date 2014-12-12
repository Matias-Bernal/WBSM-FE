'use strict';

angular.module('Wbpms')
  .controller('MemberCtrl', ['$scope', '$http', '$log', 'UserData' , 'ProjectData' , 'IterationData',
    function ($scope, $http, $log, UserData, ProjectData, IterationData) {
        
        $scope.iteration = IterationData;
        $scope.project = ProjectData;
        $scope.eMailUser = UserData;
        $scope.members = [];
        
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
            alert(JSON.stringify(data[0]));
            alert(JSON.stringify(data[0].members));
            // the server should return a json array which contains all the todos
            /*for(var i =0; i < data[0].members.length; i++) {
                if (data[0].members[i].owner == 1){
                    var member = {
                    name: data[0].members[i].name,
                    user: data[0].members[i].user,
                    owner: true
                    }
                    $scope.members.push(member);
                } 
                else {
                   var member = {
                   name: data[0].members[i].name,
                   user: data[0].members[i].user,
                   owner: false 
                }
                   $scope.members.push(member);
                }
                
            }
            alert(JSON.stringify($scope.members));*/
            $scope.members = data[0].members;
          })
          .error(function(data, status) {
            alert("error");
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
                $log.debug('Success: New member <user_email_id> added successfully to <project_name_id>'),
                alert("The new member is added");
                alert(JSON.stringify(data));
                if (data != null){
/*                    if (data.owner == 1){
                        var member = {
                            name: data.name,
                            user: data.user,
                            owner: true
                        }
                        $scope.members.push(member);
                    } else {
                        var member = {
                            name: data.name,
                            user: data.user,
                            owner: false 
                        }
                        $scope.members.push(member);
                    }*/
                    $scope.members.push(data);
                }
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
                alert("exito");
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
            
            alert(JSON.stringify(payload));
            $log.debug("Sending payload: " + JSON.stringify(payload));
            $http.post('/api/projects/members/remove', payload)
              .success(function(data, status, header, config) {
                $log.debug('Member Member removed successfully from project'); 
                 alert("The new member is removed");
                 // find the element in the data array and remove it
                for(var i =0; i < $scope.members.length; i++) {
                    if($scope.members[i].eMailMember === payload.user_email_id) {
                        $scope.members.splice(i, 1);
                    }
                }
              })
              .error(function(data, status) {
                alert("The new member is not removed");
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
                alert("Exito");
                    if($scope.members.owner == false) {
                        $scope.members.owner = true;
                        alert("Promote owner");
                    };
 
                })
                .error(function(data, status) {
                    alert("error in Promote owner");
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
                $log.debug('Downgrade owner <owner> successfully to <id_project>')
                    if($scope.members.owner == true) {
                        $scope.members = false;
                        alert("Downgrader owner");
                    }; 
              })
          .error(function(data, status) {
            alert("error in downgrade owner");
            $log.debug(data.error);   
          });
        }
        
       
    }

    ]);