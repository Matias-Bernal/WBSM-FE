'use strict';

angular.module('Wbpms')
  .controller('MemberCtrl', ['$scope', '$http', '$log', 'UserData' , 'ProjectData' ,
    function ($scope, $http, $log, UserData, ProjectData) {
        
       /* $scope.members = [
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
                owner: true
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
*/
        
        $scope.project = ProjectData;
        $scope.eMailUser = UserData;
        $scope.members = [];
        
        $scope.newUser = {
            name: '',
            eMailMember :'',
            point:'',
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
                if (data != null){ 
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
                // the server should return a json array which contains all the todos
                $scope.members = data;
              })
              .error(function(data, status) {
                alert("error");
                $log.debug(data.error);
              }); 
        }
        
        //Function remove a member from the project
        $scope.remove_member_from_project = function(projectName,eMail) {
    
             var payload = {
                project_name_id: projectName,
                user_email_id: eMail
            }
            
            $log.debug("Sending payload: " + JSON.stringify(payload));
            
            
            $http.delete('/api/projects/remove', payload)
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
                $log.debug(data.error);
              });
        }
        
        //Function promote owner
        $scope.promote_owner = function(projectName,eMail){ 
            
             var payload = {
                project_name_id: $scope.project.project_name,
                user_email_id: $scope.eMailUser.email
            }
            $log.debug("Promote owner");

            $http.post('api/projects/promote', payload)
                .success(function(data, status, header, config) {
                $log.debug('New wowner <owner> added successfully to <id_project>')
                    if($scope.members.owner == false) {
                        $scope.members = true;
                    };
                 alert("The new member promote owner");
              })
                .error(function(data, status) {
                    $log.debug(data.error);     
                });
        }
        
        $scope.ownerMemberDowngrader = function(){ 
            
             var payload = {
                project_name_id: $scope.project.project_name,
                user_email_id: $scope.eMailUser.email
            }
            $log.debug("Downgrader owner");

            $http.post('api/projects/members/downgrade', payload)
              .success(function(data, status, header, config) {
                $log.debug('Downgrade owner <owner> successfully to <id_project>')
                    if($scope.members.owner == true) {
                        $scope.members = false;
                    }; 
              })
          .error(function(data, status) {
            $log.debug(data.error);   
          });
        }
        
       
    }

    ]);