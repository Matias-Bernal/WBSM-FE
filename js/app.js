'use strict';

var app = angular.module('Wbpms', [
  'ngRoute'
]);

/** Turn on/off the angular debugging; should be off when deployed */
app.config(['$logProvider', function($logProvider){
  $logProvider.debugEnabled(false);
}]);

/** Define the routes for the application; This routing is done by Angular */
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'SessionCtrl'
      })
      .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/projects', {
        templateUrl: 'partials/projects.html',
        controller: 'ProjectCtrl'
      })
      .when('/projects/iterations', {
        templateUrl: 'partials/iterations.html',
        controller: 'IterationCtrl'
      })
      .when('/projects/iterations/work_items', {
        templateUrl: 'partials/work_items.html',
        controller: 'WorkItemCtrl'
      })
      .when('/projects/members', {
        templateUrl: 'partials/members.html',
        controller: 'MemberCtrl'
      })
      .when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
    }
]);

app.factory('UserData', function(){
    return {
      email : '',
      password : '',
      name : '',
      surname : '',
      gender : '',
      role : '',
      changepwd : false,
      avatar: ''
    }
});

app.factory('ProjectData', function(){
    return {
      project_name: '',
      poins: '',
      owner: ''
    }
});

app.factory('IterationData', function(){
    return {
      id_iteration : '',
      title_iteration : '',
      point_iteration : ''
    }
}); 