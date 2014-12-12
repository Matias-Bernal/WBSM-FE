'use strict';

angular.module('Wbpms')
  .controller('SearchCtrl', ['$scope', '$http', '$log', 'UserData', 'ProjectData', 'IterationData', 'WorkItemData',
    function ($scope, $http, $log, UserData, ProjectData, IterationData, WorkItemData) {
        
        
    $scope.globalSearchUser = [];
    $scope.globalSearchWorkItem = [];
    
    $scope.eMailUserToSearch = UserData;
    $scope.idProjectToSearch = ProjectData;
    $scope.iterationToSearch = IterationData;
    $scope.workItemToSearch = WorkItemData;
        
        
    $scope.goToWorkItems = function(project_name, iteration, wItem) {
        // Go to WorkItem 
    
          $scope.idProjectToSearch.project_name = project_name; 
          $scope.iterationToSearch.id_iteration = iteration;            
          $scope.workItemToSearch.id_WorkItem = wItem;           

          window.location.href = '#/projects/iterations/work_items';          
    
    }  
        
    
    // declaration !AND! call (see parenthesis at end of function)
    // of a function that fetches the todos from the server
    var init = function() {

    }
                
    //search global other user. pre-condition: User is login  
    $scope.search_users = function(key){
        alert('usa controlador')
        var payload = {
                keyword: key
            }
        alert(JSON.stringify(payload));
        $log.debug("Sending payload: " + JSON.stringify(payload));
        $http.post('/api/search/users', payload)
          .success(function(data, status, header, config) {
            // the server should return a json array which contains the uri redirection
            alert('find the user');
            alert(JSON.stringify(data));
             //window.location.href = '#/home';
            //$scope.globalSearchUser.search.push(data)
            $scope.globalSearchUser.push(data);
          })
          .error(function(data, status) {
             alert(JSON.stringify(data));
            $log.debug(data.error);
          });
    }
    
    //search global work item. pre-condition: User is login 
    
     $scope.search_work_items = function(key){
         alert('usa controlador2')
         var payload = {
                keyword: key 
            }
         alert(JSON.stringify(payload));
        $log.debug("Sending payload: " + JSON.stringify(payload));
        $http.post('/api/search/workitems', payload)
          .success(function(data, status, header, config) {
            // the server should return a json array which contains the uri to redirection
            alert('find the workItem');
            alert(JSON.stringify(data));
            $scope.globalSearchWorkItem.push(data);
          })
          .error(function(data, status) {
            $log.debug('Error workItem not found');
          });
    }
}]);
