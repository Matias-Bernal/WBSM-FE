'use strict';

angular.module('Wbpms')
  .controller('MemberCtrl', ['$scope', '$http', '$log', 'UserData' , 'ProjectData' , 'IterationData','SearchMemberData',
    function ($scope, $http, $log, UserData, ProjectData, IterationData,SearchMemberData) {
        
        
        $scope.iteration = IterationData;
        $scope.project = ProjectData;
        $scope.eMailUser = UserData;
        $scope.members = [];
        $scope.searchData = SearchMemberData
        
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
        
        //Add member messagges //
        $scope.addSuccessMsgVisible = false;
        $scope.addErrorMsgVisible = false;
        // promote owner messagges //
        $scope.promoteSuccessMsgVisible = false;
        $scope.promoteErrorMsgVisible = false;
        //Remove member messagges //
        $scope.removeSuccessMsgVisible = false;
        $scope.removeErrorMsgVisible = false;  
        //Downgrade owner messagges //
        $scope.downgradeSuccessMsgVisible = false;
        $scope.downgradeErrorMsgVisible = false;  
        //get member messagges//
        $scope.getSuccessMsgVisible = false;
        $scope.getErrorMsgVisible = false; 

    
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      
        $scope.init = function() {
          
            if($scope.eMailUser.email === '')
                window.location.href = '#/login';
            else 
              var payload = {
                  project_name_id: $scope.project.project_name
              }
              $log.debug("Sending payload: " + JSON.stringify(payload));
              $http.post('/api/projects/getmembers', payload)

              .success(function(data, status, header, config) {
                if ($scope.members.owner === 0)
                        $scope.members.owner = false
                else 
                        $scope.members.owner = true
                $scope.members = data[0].members;
              })
              .error(function(data, status) {
                $log.debug(data.error);
              });
        }
        
         //Function add a member in the project list
        $scope.add_member_to_projects = function(idProject,eMailUser) {  
            var payload = {
                project_name_id: idProject,
                user_email_id: eMailUser
            }

            $http.post('/api/projects/members/add', payload)
              .success(function(data, status, header, config) {
                $scope.members.push(data);
                $scope.addSuccessMsgVisible = true;
                $scope.addErrorMsgVisible = false;
                $scope.promoteSuccessMsgVisible = false;
                $scope.promoteErrorMsgVisible = false;
                $scope.removeSuccessMsgVisible = false;
                $scope.removeErrorMsgVisible = false;  
                $scope.downgradeSuccessMsgVisible = false;
                $scope.downgradeErrorMsgVisible = false; 
                $scope.getSuccessMsgVisible = false;
                $scope.getErrorMsgVisible = false; 
              })
              .error(function(data, status) {
                $scope.addSuccessMsgVisible = false;
                $scope.addErrorMsgVisible = true;
                $scope.promoteSuccessMsgVisible = false;
                $scope.promoteErrorMsgVisible = false;
                $scope.removeSuccessMsgVisible = false;
                $scope.removeErrorMsgVisible = false;  
                $scope.downgradeSuccessMsgVisible = false;
                $scope.downgradeErrorMsgVisible = false; 
                $scope.getSuccessMsgVisible = false;
                $scope.getErrorMsgVisible = false; 
              });
            
        }
        
        //Function view project members 
        $scope.get_all_project_members = function() {
            
            var payload = {
                project_name_id: $scope.project.project_name
            }
            
            $http.post('/api/projects/getmembers', payload)
              .success(function(data, status, header, config) {
                // the server should return a json array which contains all the todos
                if ($scope.members.owner === 0)
                    $scope.members.owner = false
                else 
                    $scope.members.owner = true;
                $scope.members = data[0].members;
                
                $scope.addSuccessMsgVisible = false;
                $scope.addErrorMsgVisible = false;
                $scope.promoteSuccessMsgVisible = false;
                $scope.promoteErrorMsgVisible = false;
                $scope.removeSuccessMsgVisible = false;
                $scope.removeErrorMsgVisible = false;  
                $scope.downgradeSuccessMsgVisible = false;
                $scope.downgradeErrorMsgVisible = false; 
                $scope.getSuccessMsgVisible = true;
                $scope.getErrorMsgVisible = false; 
              })
              .error(function(data, status) {
                $scope.addSuccessMsgVisible = false;
                $scope.addErrorMsgVisible = false;
                $scope.promoteSuccessMsgVisible = false;
                $scope.promoteErrorMsgVisible = false;
                $scope.removeSuccessMsgVisible = false;
                $scope.removeErrorMsgVisible = false;  
                $scope.downgradeSuccessMsgVisible = false;
                $scope.downgradeErrorMsgVisible = false; 
                $scope.getSuccessMsgVisible = false;
                $scope.getErrorMsgVisible = true; 
              }); 
        }
        
        //Function remove a member from the project
        $scope.remove_member_from_project = function(idProject,eMailUser) {
    
             var payload = {
                project_name_id: idProject,
                user_email_id: eMailUser
            }
            
            $http.post('/api/projects/members/remove', payload)
              .success(function(data, status, header, config) {
                 // find the element in the data array and remove it
                for(var i =0; i < $scope.members.length; i++) {
                    if($scope.members[i].email === payload.user_email_id) 
                        $scope.members.splice(i, 1);
                }
                $scope.addSuccessMsgVisible = false;
                $scope.addErrorMsgVisible = false;
                $scope.promoteSuccessMsgVisible = false;
                $scope.promoteErrorMsgVisible = false;
                $scope.removeSuccessMsgVisible = true;
                $scope.removeErrorMsgVisible = false;  
                $scope.downgradeSuccessMsgVisible = false;
                $scope.downgradeErrorMsgVisible = false; 
                $scope.getSuccessMsgVisible = false;
                $scope.getErrorMsgVisible = false; 
              })
              .error(function(data, status) {
                $scope.addSuccessMsgVisible = false;
                $scope.addErrorMsgVisible = false;
                $scope.promoteSuccessMsgVisible = false;
                $scope.promoteErrorMsgVisible = false;
                $scope.removeSuccessMsgVisible = false;
                $scope.removeErrorMsgVisible = true;  
                $scope.downgradeSuccessMsgVisible = false;
                $scope.downgradeErrorMsgVisible = false; 
                $scope.getSuccessMsgVisible = false;
                $scope.getErrorMsgVisible = false; 
              });
        }
        
        //Function promote owner
        $scope.promote_owner = function(idProject,eMailUser){ 
            
             var payload = {
                project_name_id: idProject,
                user_email_id: eMailUser
            }
             
            $http.post('/api/projects/members/promote', payload)
                .success(function(data, status, header, config) {
                    for(var i =0; i < $scope.members.length; i++){
                        if($scope.members[i].email === eMailUser) 
                            if ($scope.members[i].owner = false)
                                $scope.members[i].owner = true;
                    };
                    $scope.addSuccessMsgVisible = false;
                    $scope.addErrorMsgVisible = false;
                    $scope.promoteSuccessMsgVisible = true;
                    $scope.promoteErrorMsgVisible = false;
                    $scope.removeSuccessMsgVisible = false;
                    $scope.removeErrorMsgVisible = false;  
                    $scope.downgradeSuccessMsgVisible = false;
                    $scope.downgradeErrorMsgVisible = false; 
                    $scope.getSuccessMsgVisible = false;
                    $scope.getErrorMsgVisible = false; 
 
                })
                .error(function(data, status) {
                    $scope.addSuccessMsgVisible = false;
                    $scope.addErrorMsgVisible = false;
                    $scope.promoteSuccessMsgVisible = false;
                    $scope.promoteErrorMsgVisible = true;
                    $scope.removeSuccessMsgVisible = false;
                    $scope.removeErrorMsgVisible = false;  
                    $scope.downgradeSuccessMsgVisible = false;
                    $scope.downgradeErrorMsgVisible = false;   
                    $scope.getSuccessMsgVisible = false;
                    $scope.getErrorMsgVisible = false; 
                });
        }
        
        //Function Downgrader owner
        $scope.ownerMemberDowngrader = function(idProject,eMailUser){ 
            
             var payload = {
                project_name_id: idProject,
                user_email_id: eMailUser
            }
            $http.post('/api/projects/members/downgrade', payload)
              .success(function(data, status, header, config) {
                 for(var i =0; i < $scope.members.length; i++){
                    if($scope.members[i].email === eMailUser) 
                        if ($scope.members[i].owner = true)
                            $scope.members[i].owner = false;
                 };
                 $scope.addSuccessMsgVisible = false;
                 $scope.addErrorMsgVisible = false;
                 $scope.promoteSuccessMsgVisible = false;
                 $scope.promoteErrorMsgVisible = false;
                 $scope.removeSuccessMsgVisible = false;
                 $scope.removeErrorMsgVisible = false;  
                 $scope.downgradeSuccessMsgVisible = true;
                 $scope.downgradeErrorMsgVisible = false; 
                 $scope.getSuccessMsgVisible = false;
                 $scope.getErrorMsgVisible = false; 
              })
             .error(function(data, status) {
                $scope.addSuccessMsgVisible = false;
                $scope.addErrorMsgVisible = false;
                $scope.promoteSuccessMsgVisible = false;
                $scope.promoteErrorMsgVisible = false;
                $scope.removeSuccessMsgVisible = false;
                $scope.removeErrorMsgVisible = false;  
                $scope.downgradeSuccessMsgVisible = false;
                $scope.downgradeErrorMsgVisible = true;   
                $scope.getSuccessMsgVisible = false;
                $scope.getErrorMsgVisible = false; 
          });
        }
    }

    ]);