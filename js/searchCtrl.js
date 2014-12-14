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
    
    
    $scope.goToWorkItems = function(project_name, iteration, wItem) {
        // Go to WorkItem 
    
          $scope.idProjectToSearch.project_name = project_name; 
          $scope.iterationToSearch.id_iteration = iteration;            
          $scope.workItemToSearch.id_WorkItem = wItem;           

          window.location.href = '#/projects/iterations/work_items';          
    
    }  
    
    $scope.goToMembers = function(_member) {
        // Go to Members 
          $scope.memberToShow = _member;               
          window.location.href = '#/projects/members/view';          
    
    }  
    
     $scope.search = function(key, key_type){
        alert('usa controlador')
        $scope.SerchKeyData.keyword = key;
        $scope.SerchKeyData.key_type = key_type;
         alert(JSON.stringify($scope.SerchKeyData));
        window.location.href = '#/search';
     
    }
        
    
    // declaration !AND! call (see parenthesis at end of function)
    // of a function that fetches the todos from the server
    $scope.init = function() {
        var payload = {
                keyword: $scope.SerchKeyData.keyword
        }
        alert(JSON.stringify(payload));
        if ($scope.SerchKeyData.key_type == 'user') {
            $log.debug("Sending payload: " + JSON.stringify(payload));
            $http.post('/api/search/users', payload)
            .success(function(data, status, header, config) {
                $scope.globalSearchUser= data[0].matches;
                $scope.showMember = true;
                $scope.showWorkItem = false;
            })
            .error(function(data, status) {
                alert(JSON.stringify(data));
                $log.debug(data.error);
            }); 
        } else {
            $log.debug("Sending payload: " + JSON.stringify(payload));
             $http.post('/api/search/workitems', payload)
             .success(function(data, status, header, config) {
            // the server should return a json array which contains the uri to redirection
            alert('find the workItem');
            alert(JSON.stringify(data[0].matches));
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
