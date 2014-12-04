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
        
        $scope.idProject = ProjectData;
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
      
      var init = function() {
          
          var payload = {
              project_name_id: idProject.id_project
          }
          
       $log.debug("Sending payload: " + JSON.stringify(payload));
          $http.get('/api/projects/members'+ payload)

          .success(function(data, status, header, config) {
            
            // the server should return a json array which contains all the todos
            $scope.members = data;
              if(data.length > 0) {
                  $scope.newUser.eMailMember = $scope.members[0];
                }    
               
          })
          .error(function(data, status) {
            $log.debug(data.error);
          });   
      };
        
         //Function add a member in the project list
        $scope.add_member_to_projects = function() {
          /*  alert("member agree to project");
            window.location.href = '#/projects/members';  */
              
            var payload = {
                project_name_id: $scope.idProject.id_project,
                user_email_id: $scope.eMailUser.email
            }
            
           $log.debug("Sending payload: " + JSON.stringify(payload));
            $http.post('/api/projects/members', payload)
              .success(function(data, status, header, config) {
                $log.debug('Success: New member <eMailMember> added successfully to <id_project>'),
                    $scope.members.push({name: $scope.adder.name, eMailMember: $scope.adder.email, point: $scope.adder.point, owner: $scope.adder.owner});
                    //$scope.members.push(data);
              })
              .error(function(data, status) {
                $log.debug(data.error);
//                $log.debug('Error while trying to add new member to the project');
              });
            
        }
        
        //Function view project members 
      /*  $scope.get_all_project_members = function() {
            
            alert("get members to project");
            window.location.href = '#/projects/members';
            
            var payload = {
                project_name_id: id_project,
            }
            
            $log.debug("View project member");
            $http.get('/api/projects/members', payload)
                .success(function(data, status, header, config) {
                    $log.debug('Success get members');
                    $scope.members = data;
                })
                .error(function(data, status) {
                    $log.debug(data.error);
                });
        }*/
        
        //Function remove a member from the project
        $scope.remove_member_from_project = function() {
           /* 
            alert("member remove to project");
            window.location.href = '#/projects/members';*/
            
            $scope.members = _.filter($scope.members, function(param){return !param.owner;});
            
             var payload = {
                project_name_id: id_project,
                user_email_id: eMailMember
            }
            
            $log.debug("Sending payload: " + JSON.stringify(payload));
            
             // find the element in the data array and remove it
                for(var i =0; i < $scope.members.length; i++) {
                    if($scope.members[i].eMailMember === user_email_id) {
                        $scope.members.splice(i, 1);
                    }
                }
            $http.delete('/api/projects/members', payload)
              .success(function(data, status, header, config) {
                $log.debug('Member Member removed successfully from project');   
              })
              .error(function(data, status) {
                $log.debug(data.error);
              });
        }
        
        //Function promote owner
        $scope.promote_owner = function(){ 
          /*  alert("member promote owner to project");
            window.location.href = '#/projects/members';*/
            
             var payload = {
                project_name_id: id_project,
                user_email_id: eMailMember
            }
            $log.debug("Promote owner");

            $http.post('api/projects/members/promote', payload)
                .success(function(data, status, header, config) {
                $log.debug('New wowner <owner> added successfully to <id_project>')
                    if($scope.members.owner == false) {
                        $scope.members = true;
                    };
              })
                .error(function(data, status) {
                    $log.debug(data.error);     
                });
        }
        
        $scope.ownerMemberDowngrader = function(){ 
          /*  alert("member promote owner to project");
            window.location.href = '#/projects/members';*/
            
             var payload = {
                project_name_id: id_project,
                user_email_id: eMailMember
            }
            $log.debug("Downgrader owner");

            $http.delete('api/projects/members/promote', payload)
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