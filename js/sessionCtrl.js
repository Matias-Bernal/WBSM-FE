'use strict';

angular.module('Wbpms')
  .controller('SessionCtrl', ['$scope', '$http', '$log', 'UserData', //'$upload',
    function ($scope, $http, $log, UserData) {

        $scope.loginModel = UserData;

        $scope.newUser = {
            new_user_email : '',
            new_user_password : '',
            new_user_confirm_password : '',
            new_user_name : '',
            new_user_surname : '',
            new_user_gender : '',
            new_user_role : '',
            new_user_avatar: ''
        };
        
        $scope.roles = {  
            "values": ["Developer", "Project Manager", "Quality Assurance", "Business Analyst","Other"] 
        };

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
        $scope.init = function() {
        };

        // Function login user.
        $scope.clear = function() {
            $scope.newUser.new_user_email = '';
            $scope.newUser.new_user_password = '',
            $scope.newUser.new_user_confirm_password = '',
            $scope.newUser.new_user_name = '';
            $scope.newUser.new_user_surname = '';
            $scope.newUser.new_user_gender = '';
            $scope.newUser.new_user_role = '';
        }

        $scope.checkLogIn = function(_loginModel){
            if(_loginModel.email != null && _loginModel.email !== '' && _loginModel.password != null && _loginModel.password !== '' && _loginModel.password.length >= 8)
                return true;
            else
                return false;
        }
    
/*        $scope.uploadFile = function(file) {
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", file[0]);

            $http.post('', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            })
            .success(function(data, status, header, config) {
                $log.debug('Success file upload');                    
                $scope.loginModel.avatarpath = data.avatarpath;
            })
            .error(function(data, status) {
                $log.debug('Error while trying upload file');
            });
        };*/

        $scope.logIn = function(_loginModel) {
            // construct the payload that we will send as part of the post request
            if($scope.checkLogIn(_loginModel)){
                var payload = {
                    email : _loginModel.email,
                    password : _loginModel.password
                };
                $log.debug("Sending payload: " + JSON.stringify(payload));
                // send the payload to the server
                $http.post('/api/sessions', payload)
                .success(function(data, status, header, config) {
                    $log.debug('Success login user');
                    
                    $scope.loginModel.name = data.name;
                    $scope.loginModel.surname = data.surname;
                    $scope.loginModel.email = data.email;
                    $scope.loginModel.password = data.password;
                    $scope.loginModel.role = data.role;
                    $scope.loginModel.gender = data.gender;
                    $scope.loginModel.changepwd = data.changepwd;

/*                    if(data.avatarpath===''){
                        if(data.gender === 'Male')
                            $scope.loginModel.avatar = 'img/male.png';
                        else
                            $scope.loginModel.avatar = 'img/female.png';
                    }else{
                        $scope.loginModel.avatar = data.avatarpath;
                    }*/
                    
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
                    $scope.loggedUser = true;
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
            }else{
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
            }
       }

        $scope.checkSingUp = function(_newUser){
            if(_newUser.new_user_email !== '' && _newUser.new_user_password !== '' && _newUser.new_user_password.length >= 8
                && _newUser.new_user_confirm_password === _newUser.new_user_password && _newUser.new_user_name !== '' && _newUser.new_user_surname !== '' && _newUser.new_user_gender !== '')
                return true;
            else
                return false;
        }

       $scope.singUp = function(_newUser) {
            if($scope.checkSingUp(_newUser)){
                var payload = {
                    email : _newUser.new_user_email,
                    password : _newUser.new_user_password,
                    name : _newUser.new_user_name,
                    surname : _newUser.new_user_surname,
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
            }else{
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
            }
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
                $scope.loggedUser = false;
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
            var payload = {
                email : userEmail,
            }
            $http.post('/api/sessions', payload)
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