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
      .when('/projects/iterations/work_items/view', {
        templateUrl: 'partials/view_work_item.html',
        controller: 'WorkItemCtrl'
      })
      .when('/projects/members', {
        templateUrl: 'partials/members.html',
        controller: 'MemberCtrl'
      })
      .when('/projects/members/view', {
        templateUrl: 'partials/view_member.html',
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
      gender : false,
      role : '',
      changepwd : false,
      avatar: ''
    }
});

app.factory('ProjectData', function(){
    return {
      project_name: '',
      points: '',
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

app.factory('WorkItemData', function(){
    return {
        id_WorkItem: '',
        title_WorkItem: '',
        descriptionIter_WorkItem : '',
        point_WorkItem: '',
        createdby_WorkItem : '',
        status_WorkItem : '',
        ownedBy_WorkItem : '',
        comments_WorkItem : '',
        links_WorkItem : ''
    }
}); 


app.factory('SearchMemberData', function(){
    return {
      email : '',
      name : '',
      surname : '',
      gender : '',
      role : '',
      avatar: ''

    }
}); 

app.factory('SearchWorkItemData', function(){
    return {
        id_WorkItem: '',
        title_WorkItem: '',
        descriptionIter_WorkItem : '',
        point_WorkItem: '',
        status_WorkItem : '',
        comments_WorkItem : '',
        links_WorkItem : ''
    }
}); 

app.factory('SearchKey', function(){
    return {
      keyword:'',
      key_type: ''
    }
}); 
