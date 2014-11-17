'use strict';

angular.module('Wbpms')
  .controller('UsersCtrl', ['$scope', '$http', '$log', '$timeout',
    function ($scope, $http, $log, $timeout) {

      // the model that we bind to the input box
      $scope.newUser = {
        name: ''
      }

      $scope.successMsgVisible = false;

      // the function to add the new users
      $scope.addUser = function(userName) {

        // the payload is simple the json object that we used for binding to the input
        var payload = $scope.newUser;

        $http.post('/api/users', payload)
          .success(function(data, status, header, config) {

            $log.debug('Success adding new user');

            // reset the todoModel to not have a description (we keep the last selected user)
            $scope.newUser.name = '';

            // show a success message
            $scope.successMsgVisible = true;
            // let the message dissapear after 2 secs
            $timeout(function() {$scope.successMsgVisible = false;}, 2000);
          })
          .error(function(data, status) {
            $log.debug('Error while trying to add a new user');
          });
      }

    } 
  ]);
