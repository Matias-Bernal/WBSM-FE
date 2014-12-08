'use strict';

angular.module('Wbpms')
  .controller('WorkItemCtrl', ['$scope', '$http', '$log','ProjectData', 'IterationData',
    function ($scope, $http, $log, ProjectData, IterationData) {

      $scope.iteration = IterationData;
      $scope.project = ProjectData;
      $scope.workItems = []; 

    /*  $scope.workItems = [
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
        ]; */
        
      $scope.workItemModel = {
           idWorkItem: '',
           title: '',
           descriptionIter : '',
           point: '',
           createdby : '',
           status : '',
           ownedBy : '',
           comments : '',
           links : ''
      }  


      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      var init = function() {

        var payload = {
          project_name = $scope.project.project_name,
          iteration_number = $scope.iteration.id_iteration
        }

      $log.debug("Sending payload: " + JSON.stringify(payload));
        // send the payload to the server
        $http.get('api/projects/iterations/workitems', payload)
           .success(function(data, status, header, config) {
            alert(JSON.stringify(data));
            $scope.idWorkItem = data;
            if(data.length > 0) {
              $scope.workItemModel.idWorkItem = $scope.workItems[0];
            }  
          })   
          .error(function(data, status) {
            alert("ERROR"+ JSON.stringify(data));
            $log.debug('Error while fetching iterations from server');
          });

      };
        
    
     $scope.getWorkItemInfo = function(idWorkItem) {
       //the server should return a json with work_item info

     }

     $scope.createWorkItem = function(idIteration, nameProject, titleWorkItem, descriptionIter, pointsIter, createdByIter, statusIter, ownerByIter, comentsIter, linksIter) {
       // function add new work_item inside an iteration

       var payload = {
        iteration_number : iditeration,
        project_name_id : nameProject,
        work_item_title : titleWorkItem,
        description : descriptionIter,
        points : pointsIter,
        createdby : createdByIter,
        status : statusIter,
        ownerby : ownerByIter,
        comments : commentsiIter,
        links : linksIter
       }

       $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.post('api/projects/iterations/workitems', payload)
            .success(function(data, status, header, config) {
              $log.debug('Success adding new work item');
              alert("The new work item is added");
              $scope.workItems.push(data);
            })          

            .error(function(data, status) {
              alert("ERROR");
              $log.debug('Error while trying to add new work item');
            });
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
     } 

        
    }
  ]);