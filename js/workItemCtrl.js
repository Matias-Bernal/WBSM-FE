'use strict';

angular.module('Wbpms')
  .controller('WorkItemCtrl', ['$scope', '$http', '$log','ProjectData', 'IterationData',
    function ($scope, $http, $log, ProjectData, IterationData) {

      $scope.project = ProjectData;

      $scope.iteration = IterationData;

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
      $scope.init = function() {

        var payload = {
           project_name : $scope.project.project_name,
           iteration_number : $scope.iteration.id_iteration
        }
        $log.debug("Sending payload: " + JSON.stringify(payload));
        // send the payload to the server
        $http.post('/api/projects/iterations/getworkitems', payload)
           .success(function(data, status, header, config) {
            alert(JSON.stringify(data));
            $scope.workItems = data;
          })   
          .error(function(data, status) {
            alert("ERROR"+ JSON.stringify(data));
          });

      }
        
    
     $scope.get_work_item_info = function(idWorkItem) {
       //the server should return a json with work_item info
       var payload = {
          work_item_id : idWorkItem
        }

      $log.debug("Sending payload: " + JSON.stringify(payload));
        // send the payload to the server
        $http.get('/api/projects/iterations/getwork_items', payload)
           .success(function(data, status, header, config) {
            alert(JSON.stringify(data));
            $scope.idWorkItem = data;
          })   
          .error(function(data, status) {
            alert("ERROR"+ JSON.stringify(data));
            $log.debug('Error while try fetch work item info from server');
          });
      }

     $scope.create_work_item = function(idIteration, nameProject, titleWorkItem, descriptionIter, pointsIter, statusIter, comentsIter, linksIter) {
       // function add new work_item inside an iteration

       var payload = {
        iteration_number : idIteration,
        project_name_id : nameProject,
        work_item_title : titleWorkItem,
        description : descriptionIter,
        points : pointsIter,
        status : statusIter,
        comments : commentsiIter,
        links : linksIter        
       }

       $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.post('/api/projects/iterations/workitems', payload)
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

     $scope.delete_work_item = function(idWorkItem) {
      // function delete a work_item to a project
      var payload = {
              work_item_id : idWorkItem
          }

      $log.debug("Sending payload: " + JSON.stringify(payload));

          // send the payload to the server
          $http.delete('api/projects/iterations/workitems', payload)
            .success(function(data, status, header, config) {
              $log.debug('Success remove work item');
              alert("The work item was deleted");                
            })
            .error(function(data, status) {
              $log.debug('Error while trying to remove a work item');
            }); 
        }    

     $scope.updateWorkItem = function(idWorkItem, idIteration, idProject, name, description, points, createdBy, owner) {
     // function update a work_item
     }

     $scope.get_all_iteration_work_items = function(nameProject, idIteration) {
     // the server should return a json array which contains all
     // work_items of an iteration
        var payload = {
           project_name : nameProject,
           iteration_number : idIteration
        }

      $log.debug("Sending payload: " + JSON.stringify(payload));
        // send the payload to the server
        $http.post('/api/projects/iterations/getworkitems', payload)
           .success(function(data, status, header, config) {
            $scope.workItems = data;
          })   
          .error(function(data, status) {
            alert("ERROR"+ JSON.stringify(data));
          });

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