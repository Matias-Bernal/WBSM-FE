'use strict';

angular.module('Wbpms')
  .controller('SessionCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log, $location) {
        
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
            new_user_username : '',
            new_user_password : '',
            new_user_confirm_password : '',
            new_user_name : '',
            new_user_surname : '',
            new_user_email : '',
            new_user_gender : '',
            new_user_role : '',
        }
        
        $scope.loggedUser = false;
        $scope.forgetPasswordEmail = '';
       
        //Log In info messagges //
        $scope.logInSuccessMsgVisible = false;
        $scope.logInErrorMsgVisible = false;
        //Sign Up info messagges //
        $scope.signUpSuccessMsgVisible = false;
        $scope.signUpErrorMsgVisible = false;
        //Log Out info messagges //
        $scope.logOutSuccessMsgVisible = false;
        $scope.logOutErrorMsgVisible = false;
        //Forget Password info messagges //
        $scope.forgetPasswordSuccessMsgVisible = false;
        $scope.forgetPasswordErrorMsgVisible = false;

        // declaration !AND! call (see parenthesis at end of function)
        // of a function that fetches the todos from the server
        var init = function() {};

        // Function login user.
        $scope.clear = function() {
            $scope.newUser.new_user_username = '';
            $scope.newUser.new_user_name = '';
            $scope.newUser.new_user_surname = '';
            $scope.newUser.new_user_email = '';
            $scope.newUser.new_user_gender = '';
            $scope.newUser.new_user_role = '';
        }
    
        $scope.logIn = function(_loginModel) {
            // construct the payload that we will send as part of the post request
            var payload = {
                email : _loginModel.username,
                password : _loginModel.password
            }

            $log.debug("Sending payload: " + JSON.stringify(payload));

            // send the payload to the server
            $http.post('/api/sessions', payload)
            .success(function(data, status, header, config) {
                $log.debug('Success login user');
                // alert(data.username);
                // alert(data.password);
                // alert(data.name);
                // alert(data.surname);
                // alert(data.email);
                // alert(data.gender);
                // alert(data.role);
                // alert(data.changepwd);

                $scope.loginModel = data;
                $scope.logInSuccessMsgVisible = true;
                $scope.logInErrorMsgVisible = false;
                //Sign Up info messagges //
                $scope.signUpSuccessMsgVisible = false;
                $scope.signUpErrorMsgVisible = false;
                //Log Out info messagges //
                $scope.logOutSuccessMsgVisible = false;
                $scope.logOutErrorMsgVisible = false;
                //Forget Password info messagges //
                $scope.forgetPasswordSuccessMsgVisible = false;
                $scope.forgetPasswordErrorMsgVisible = false;
                window.location.href = '#/home';
            })
            .error(function(data, status) {
                $log.debug('Error while trying login user');
                $scope.logInSuccessMsgVisible = false;
                $scope.logInErrorMsgVisible = true;
                //Sign Up info messagges //
                $scope.signUpSuccessMsgVisible = false;
                $scope.signUpErrorMsgVisible = false;
                //Log Out info messagges //
                $scope.logOutSuccessMsgVisible = false;
                $scope.logOutErrorMsgVisible = false;
                //Forget Password info messagges //
                $scope.forgetPasswordSuccessMsgVisible = false;
                $scope.forgetPasswordErrorMsgVisible = false;
            });
            //$scope.logInErrorMsgVisible = true;
            //location.href = '#/home';
       }

       $scope.singUp = function(_newUser) {
       // construct the payload that we will send as part of the post request
            var payload = {
                username : _newUser.new_user_username,
                password : _newUser.new_user_password,
                name : _newUser.new_user_name,
                surname : _newUser.new_user_surname,
                email : _newUser.new_user_email,
                gender : _newUser.new_user_gender,
                role : _newUser.new_user_role,
                photo : 'img/users_avatars/'+_newUser.new_user_username+'.png'
            }
            $log.debug("Sending payload: " + JSON.stringify(payload));
            // send the payload to the server
            $http.post('/api/users', payload)
            .success(function(data, status, header, config) {
                $log.debug('Success adding new user');
                $scope.logInSuccessMsgVisible = false;
                $scope.logInErrorMsgVisible = false;
                //Sign Up info messagges //
                $scope.signUpSuccessMsgVisible = true;
                $scope.signUpErrorMsgVisible = false;
                //Log Out info messagges //
                $scope.logOutSuccessMsgVisible = false;
                $scope.logOutErrorMsgVisible = false;
                //Forget Password info messagges //
                $scope.forgetPasswordSuccessMsgVisible = false;
                $scope.forgetPasswordErrorMsgVisible = false;
            })
            .error(function(data, status) {
                $log.debug('Error while trying to add new user');
                $scope.logInSuccessMsgVisible = false;
                $scope.logInErrorMsgVisible = false;
                //Sign Up info messagges //
                $scope.signUpSuccessMsgVisible = false;
                $scope.signUpErrorMsgVisible = true;
                //Log Out info messagges //
                $scope.logOutSuccessMsgVisible = false;
                $scope.logOutErrorMsgVisible = false;
                //Forget Password info messagges //
                $scope.forgetPasswordSuccessMsgVisible = false;
                $scope.forgetPasswordErrorMsgVisible = false;
            });
       }
       
       $scope.logout = function() {
            $http.post('/api/sessions')
            .success(function(data, status, header, config) {
                $log.debug('Success logout user');
                    $scope.logInSuccessMsgVisible = false;
                    $scope.logInErrorMsgVisible = false;
                    //Sign Up info messagges //
                    $scope.signUpSuccessMsgVisible = false;
                    $scope.signUpErrorMsgVisible = false;
                    //Log Out info messagges //
                    $scope.logOutSuccessMsgVisible = true;
                    $scope.logOutErrorMsgVisible = false;
                    //Forget Password info messagges //
                    $scope.forgetPasswordSuccessMsgVisible = false;
                    $scope.forgetPasswordErrorMsgVisible = false;
            })
            .error(function(data, status) {
                $log.debug('Error while trying logout user');
                    $scope.logInSuccessMsgVisible = false;
                    $scope.logInErrorMsgVisible = false;
                    //Sign Up info messagges //
                    $scope.signUpSuccessMsgVisible = false;
                    $scope.signUpErrorMsgVisible = false;
                    //Log Out info messagges //
                    $scope.logOutSuccessMsgVisible = false;
                    $scope.logOutErrorMsgVisible = true;
                    //Forget Password info messagges //
                    $scope.forgetPasswordSuccessMsgVisible = false;
                    $scope.forgetPasswordErrorMsgVisible = false;
            });
       }
       
       $scope.forgetPassword = function(userEmail) {
            $http.post('/api/sessions')
            .success(function(data, status, header, config) {
                $log.debug('Success send password email');
                $scope.logInSuccessMsgVisible = false;
                $scope.logInErrorMsgVisible = false;
                //Sign Up info messagges //
                $scope.signUpSuccessMsgVisible = false;
                $scope.signUpErrorMsgVisible = false;
                //Log Out info messagges //
                $scope.logOutSuccessMsgVisible = false;
                $scope.logOutErrorMsgVisible = false;
                //Forget Password info messagges //
                $scope.forgetPasswordSuccessMsgVisible = true;
                $scope.forgetPasswordErrorMsgVisible = false;
            })
            .error(function(data, status) {
                $log.debug('Error while trying sending password email');
                $scope.logInSuccessMsgVisible = false;
                $scope.logInErrorMsgVisible = false;
                //Sign Up info messagges //
                $scope.signUpSuccessMsgVisible = false;
                $scope.signUpErrorMsgVisible = false;
                //Log Out info messagges //
                $scope.logOutSuccessMsgVisible = false;
                $scope.logOutErrorMsgVisible = false;
                //Forget Password info messagges //
                $scope.forgetPasswordSuccessMsgVisible = false;
                $scope.forgetPasswordErrorMsgVisible = true;
            });
       }
    }
]);