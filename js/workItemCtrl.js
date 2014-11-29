'use strict';

angular.module('Wbpms')
  .controller('WorkItemCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {
      
      $scope.workItems = [
            {
                idWorkItem:'001',
                title:'Work Item 001',
                point:'00/00'
            },
            {
                idWorkItem:'002',
                title:'Work Item 002',
                point:'00/00'
            },
            {
                idWorkItem:'003',
                title:'Work Item 003',
                point:'00/00'
            },
            {
                idWorkItem:'004',
                title:'Work Item 004',
                point:'00/00'
            }
        ];
        
      $scope.newWorkItem = {
           idWorkItem: '',
           title: '',
           point: ''
      }  


      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      var init = function() {

      };
        
   /*  
     $scope.getWorkItemInfo = function(idWorkItem) {
       //the server should return a json with work_item info

     }

     $scope.createWorkItem = function(idIteration, idProject, name, description, createdBy, owner) {
       // function add new work_item inside an iteration
     }

     $scope.deleteWorkItem = function(idWorkItem) {
      // function delete a work_item to a project
     }

     $scope.updateWorkItem = function(idWorkItem, idIteration, idProject, name, description, points, createdBy, owner) {
     // function update a work_item
     }

     $scope.getAllIterationWorkItems = function(idProject, idIteration) {
     // the server should return a json array which contains all
     // work_items of an iteration
     }

     $scope.addComment = function(date, idWorkItem, content, author) {
     //  function add a comment to a work_item
     }

     $scope.getAllWorkItemComments = function(idWorkItem) {
     // the server should return a json array with all comments about
     // a certain work_item  
     }

     $scope.addLink = function(idWorkItemSource, idWorkItemDetination) {
     // function add new link between two work_items
     }

     $scope.removeLink = function(idWorkItemSource, idWorkItemDetination) {
     // function delete an existing link between two work_items
     }

     $scope.getAllWorkItemLinks = function(idWorkItem) {
    // the server should return a json array with all links about
    // a certain work_item
     } */

        
    }
  ]);