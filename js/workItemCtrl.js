'use strict';

angular.module('Wbpms')
  .controller('WorkItemCtrl', ['$scope', '$http', '$log','UserData', 'ProjectData', 'IterationData',
    function ($scope, $http, $log, UserData, ProjectData, IterationData) {

      $scope.usuario = UserData;

      $scope.project = ProjectData;

      $scope.iteration = IterationData;

      $scope.workItems = []; 

      $scope.comments = [];
     
      $scope.linkss = [];
 
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

      $scope.newWorkItem = {
            new_idWorkItem : '',
            new_title : '',
            new_descriptionIter : '',
            new_point : '',
            new_createdby : '',
            new_status : '',
            new_ownedBy : '',
            new_comments : '',
            new_links : ''
      };

      $scope.delWorkItem = {
        work_item_id : '',
        work_item_number : ''
      }

      $scope.delLink = {
        first_workItem : '',
        second_workItem : ''
      }

      $scope.statusWorkItems = {  
            "values": ["Not started", "Ongoing", "Done"] 
      };

      //Add workitem messagges //
      $scope.addSuccessMsgVisible = false;
      $scope.addErrorMsgVisible = false;
      //Rename workitem messagges //
      $scope.renameSuccessMsgVisible = false;
      $scope.renameErrorMsgVisible = false;
      //Remove workitem messagges //
      $scope.removeSuccessMsgVisible = false;
      $scope.removeErrorMsgVisible = false;  
    

      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
      $scope.init = function() {

          if($scope.usuario.email === '')
              window.location.href = '#/login';
          else        

              var payload = {
                 project_name : $scope.project.project_name,
                 iteration_number : $scope.iteration.id_iteration
              }
              $log.debug("Sending payload: " + JSON.stringify(payload));
              // send the payload to the server
              $http.post('/api/projects/iterations/getworkitems', payload)
                 .success(function(data, status, header, config) {
                  data.pop(); // lo hago porque me estaba tomando un elemento de mas que era el succes, con esto elimino el primer elemento de la lista data
                  $scope.workItems = data;
                  
                })   
                .error(function(data, status) {
                });

      }
        
    
     $scope.get_work_item_info = function(idWorkItem) {
       //the server should return a json with work_item info
       var payload = {
          work_item_id : idWorkItem
        }

      // send the payload to the server
        $http.post('/api/projects/iterations/getwork_item', payload)
           .success(function(data, status, header, config) {
            //$scope.idWorkItem = data;          
          })   
          .error(function(data, status) {
          });
      }

     $scope.create_work_item = function(titleWorkItem, descriptionIter, pointsIter, statusIter, commentsIter, linksIter) {
       // function add new work_item inside an iteration


       var payload = {
        iteration_number : $scope.iteration.id_iteration,
        project_name_id : $scope.project.project_name,
        work_item_title : titleWorkItem,
        description : descriptionIter,
        points : pointsIter,
        status : statusIter,
        comments : $scope.comments,
        links : $scope.linkss        
       }

       // send the payload to the server
          $http.post('/api/projects/iterations/workitems', payload)
            .success(function(data, status, header, config) {

              var payload2 = {
                work_item_id : data.new_id
              }
              $http.post('/api/projects/iterations/getwork_item', payload2)
                .success(function(data, status, header, config) {
                  $scope.workItems.push(data);
                })
                .error(function(data, status) {
                });

              var payload3 = {
                work_item_id : workItems.id,
                comment : $scope.comments
              }
              $http.post('/api/projects/iterations/workitems/comments', payload3)
                .success(function(data, status, header, config) {
                })
                .error(function(data, status) {
                });

              var payload4 = {
                id_work_item_source : workItems.id,
                id_work_item_destination : $scope.linkss
              }
              $http.post('/api/projects/iterations/workitems/links', payload4)
                .success(function(data, status, header, config) {
                })
                .error(function(data, status) {
                });                


              $scope.addSuccessMsgVisible = true;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = false;                 
            })          

            .error(function(data, status) {
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = true;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = false;                 
            });
     }

     $scope.delete_work_item = function(idWorkItem) {

      var payload = {
              work_item_id : idWorkItem //delWorkItem.work_item_id
          }

          // send the payload to the server
          $http.post('/api/projects/iterations/workitems/delete_workitem', payload)
            .success(function(data, status, header, config) {
              for(var i =0; i < $scope.workItems.length; i++) {
                if($scope.workItems[i].number === $scope.delWorkItem.work_item_number) {
                  $scope.workItems.splice(i, 1);
                  break;
                }
              }
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = true;
              $scope.removeErrorMsgVisible = false;              

            })
            .error(function(data, status) {
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = true;                
            }); 

        }    

     $scope.updateWorkItem = function(idWorkItem, idIteration, idProject, name, description, points, createdBy, owner) {
     // function update a work_item
     }

     
     $scope.add_comment = function(_content) {
     //  function add a comment to a work_item
        
        $scope.comments.push(_content);

     }

     $scope.get_all_work_item_comments = function(idWorkItem) {
     // the server should return a json array with all comments about
     // a certain work_item
        var payload = {
          work_item_id : idWorkItem
        }  

        $log.debug("Sending payload: " + JSON.stringify(payload));
        // send the payload to the server
        $http.post('/api/projects/iterations/workitems/getcomments', payload)
           .success(function(data, status, header, config) {
            $scope.comments = data[0].comments;
          })   
          .error(function(data, status) {
          });

     } 

     $scope.add_link = function(link) {
     // function add new link between two work_items
        $scope.linkss.push(link);
     }

     $scope.removeLink = function(idWorkItemSource, idWorkItemDetination) {
      // function delete an existing link between two work_items

     }

    $scope.setDelete = function(idWorkItem, numberWorkItem) {
      // Set number work Item to Delete
      $scope.delWorkItem.work_item_id = idWorkItem;
      $scope.delWorkItem.work_item_number = numberWorkItem;
    }


   $scope.setDeleteLink = function(firstWorkItem, secondWorkItem) {
       $scope.delLink.first_workItem = firstWorkItem;
       $scope.delLink.second_workItem = secondWorkItem;
   }

  }
]);