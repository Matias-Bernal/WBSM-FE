'use strict';

angular.module('Wbpms')
  .controller('SessionCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {
        
        $scope.loginModel = {
            username : '',
            password : '',
            name : '',
            surname : '',
            email : '',
            gender : '',
            role : '',
            changepwd : false
        }
        
        $scope.newUser = {
            new_user_name : '',
            new_user_surname : '',
            new_user_email : '',
            new_user_gender : '',
            new_user_role : ''
        }
        
        $scope.forgetPasswordEmail = '';
        $scope.successMsgVisible = false;
        
        // declaration !AND! call (see parenthesis at end of function)
        // of a function that fetches the todos from the server
        var init = function() {
        };

        // Function login user.
        $scope.clear = function() {
            $scope.newUser.new_user_name = '';
            $scope.newUser.new_user_surname = '';
            $scope.newUser.new_user_email = '';
            $scope.newUser.new_user_gender = '';
            $scope.newUser.new_user_role = '';
            $scope.newUser.changepwd = false;
        }
    
        $scope.logIn = function(username,password) {
            // construct the payload that we will send as part of the post request
/*            var payload = {
                action : 'login',
                username : loginModel.username,
                password : loginModel.password
            }

            $log.debug("Sending payload: " + JSON.stringify(payload));

            // send the payload to the server
            $http.post('/api/sessions', payload)
            .success(function(data, status, header, config) {
                $log.debug('Success login user');
                $scope.loginModel = data;
            })
            .error(function(data, status) {
                $log.debug('Error while trying login user');
            });*/
            alert(username);
            alert(password);
            window.location.href = '#/home';
       }

       $scope.singUp = function(newUser) {
       // construct the payload that we will send as part of the post request
            var payload = {
                action : 'singup',
                name : newUser.name,
                surname : newUser.surname,
                email : newUser.email,
                gender : newUser.gender,
                role : newUser.role
            }
            $log.debug("Sending payload: " + JSON.stringify(payload));
            // send the payload to the server
            $http.post('/api/sessions', payload)
            .success(function(data, status, header, config) {
                $log.debug('Success adding new user');
            })
            .error(function(data, status) {
                $log.debug('Error while trying to add new user');
            });
       }
       
       $scope.logout = function() {
            $http.post('/api/sessions')
            .success(function(data, status, header, config) {
                $log.debug('Success logout user');
            })
            .error(function(data, status) {
                $log.debug('Error while trying logout user');
            });
       }
       
       $scope.forgetPassword = function(userEmail) {
            $http.post('/api/sessions')
            .success(function(data, status, header, config) {
                $log.debug('Success send password email');
            })
            .error(function(data, status) {
                $log.debug('Error while trying sending password email');
            });
       }
    }
]);