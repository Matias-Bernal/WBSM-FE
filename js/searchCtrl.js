'use strict';

angular.module('Wbpms')
  .controller('SearchCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {
        
        
    $scope.globalSearchUser = [{
        idUser:'jimmy'
    }
    ];
    $scope.globalSearchWorkItem = [{
        idWorkItem: 'jimmy2'
    }];
        
    
    // declaration !AND! call (see parenthesis at end of function)
    // of a function that fetches the todos from the server
    var init = function() {

    }
                
    //search global other user. pre-condition: User is login  
    $scope.globalOtherUserSearch = function(searchs){
        alert('usa controlador')
        //$scope.globalSearchUser.push($scope.searchs)
        var payload = {
                keyword: $scope.searchs
            }
        $log.debug("Sending payload: " + JSON.stringify(payload));
        $http.post('/api/search/users', payload)
          .success(function(data, status, header, config) {
            // the server should return a json array which contains the uri redirection
            alert('find the user');
            alert(JSON.stringify(data));
             //window.location.href = '#/home';
            //$scope.globalSearchUser.search.push(data)
            //$scope.globalSearchUser = data;
          })
          .error(function(data, status) {
            $log.debug(data.error);
          });
    }
    
    //search global work item. pre-condition: User is login 
    
     $scope.globalWorkItemSearch = function(searchs){
         alert('usa controlador2')
         //$scope.globalSearchWorkItem.push($scope.searchs)
         var payload = {
                keyword: $scope.searchs 
            }
         
        $log.debug("Sending payload: " + JSON.stringify(payload));
        $http.post('/api/search/workitem', payload)
          .success(function(data, status, header, config) {
            // the server should return a json array which contains the uri to redirection
            alert('find the workItem');
            alert(JSON.stringify(data));
            //$scope.globalSearchWorkItem = data;
          })
          .error(function(data, status) {
            $log.debug('Error workItem not found');
          });
    }
}]);
