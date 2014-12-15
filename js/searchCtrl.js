'use strict';

angular.module('Wbpms')
  .controller('SearchCtrl', ['$scope', '$http', '$log', 'UserData', 'ProjectData', 'IterationData', 'WorkItemData', 'SearchMemberData', 'SearchWorkItemData', 'SearchKey',
    function ($scope, $http, $log, UserData, ProjectData, IterationData, WorkItemData, SearchMemberData, SearchWorkItemData, SearchKey) {
        
        
    $scope.globalSearchUser = [];
    $scope.globalSearchWorkItem = [];
    
    $scope.eMailUserToSearch = UserData;
    $scope.idProjectToSearch = ProjectData;
    $scope.iterationToSearch = IterationData;
    $scope.workItemToSearch = WorkItemData;
    $scope.memberToShow = SearchMemberData;
    $scope.workItemToShow = SearchWorkItemData;
    $scope.SerchKeyData = SearchKey;
       
    $scope.showMember = false;
    $scope.showWorkItem = false;
    
    
    $scope.goToWorkItems = function(work_item_id) {
        // Go to WorkItem 
    /*
          $scope.idProjectToSearch.project_name = project_id; 
          $scope.iterationToSearch.id_iteration = iteration_id; */       
          $scope.workItemToShow.id_WorkItem = work_item_id;     

          window.location.href = '#/projects/iterations/getwork_item';          
    
    } 
    
    $scope.goToMembers = function(name, surname, email, gender, role, avatar) {
        // Go to Members 
          $scope.memberToShow.name = name;   
          $scope.memberToShow.surname = surname;
          $scope.memberToShow.email = email;
          $scope.memberToShow.gender = gender;
          $scope.memberToShow.role = role;
          $scope.memberToShow.avatar = avatar;
          window.location.href = '#/projects/members/view';          
    
    }  
    
     $scope.searches = function(key, key_type){
        $scope.SerchKeyData.keyword = key;
        $scope.SerchKeyData.key_type = key_type;
        window.location.href = '#/search';
     
    }
        
    
    // declaration !AND! call (see parenthesis at end of function)
    // of a function that fetches the todos from the server
    $scope.init = function() {
        var payload = {
                keyword: $scope.SerchKeyData.keyword
        }
        if ($scope.SerchKeyData.key_type == 'user') {
            $http.post('/api/search/users', payload)
            .success(function(data, status, header, config) {
                $scope.globalSearchUser= data[0].matches;
                $scope.showMember = true;
                $scope.showWorkItem = false;
            })
            .error(function(data, status) {
                $log.debug(data.error);
            }); 
        } else {
             $http.post('/api/search/workitems', payload)
             .success(function(data, status, header, config) {
            // the server should return a json array which contains the uri to redirection
            $scope.globalSearchWorkItem = data[0].matches;
             $scope.showMember = false;
             $scope.showWorkItem = true;
             })
             .error(function(data, status) {
                 $log.debug('Error workItem not found');
             }); 
        }
    }

}]);
