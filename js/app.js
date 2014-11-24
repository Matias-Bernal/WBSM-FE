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
        controller: 'sessionCtrl'
      })
      .when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
      })
      .when('/projects', {
        templateUrl: 'projects.html',
        controller: 'projectCtrl'
      })
      .when('/projects/iterations', {
        templateUrl: 'partials/iterations.html',
        controller: 'iterationCtrl'
      })
      .when('/projects/iterations/work_items', {
        templateUrl: 'partials/work_items.html',
        controller: 'workItemCtrl'
      })
      .when('/projects/members', {
        templateUrl: 'partials/members.html',
        controller: 'memberCtrl'
      })
      .when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'searchCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
    }
  ]);
