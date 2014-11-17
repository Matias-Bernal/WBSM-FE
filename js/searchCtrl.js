'use strict';

angular.module('Wbpms')
  .controller('SearchCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {
        
        
        $scope.searchUser{
        }
      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      var init = function() {
      
      }
          
          
        //search global other user. pre-condition: User is login  
        $scope.searchGlobalOtherUser = function(user,keyword){
            
           $http.get('/api/search/'+user+keyword)
          .success(function(data, status, header, config) {
            
            // the server should return a json array which contains all the todos
            $scope.searchUser = data;
          });
          .error(function(data, status) {
            $log.debug('Error user not found');
          });
        
        }
        
        
       
        
  ]);