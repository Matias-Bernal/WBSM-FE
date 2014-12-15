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

      $scope.modifyWorkItem = {
        workitem : {},
        comments : [],
        links : []
      };


      $scope.infoWorkItem = {
        workitem : {},
        comments : [],
        links : []
      };

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
                  $scope.workItems = data[0].workitems;
                })   
                .error(function(data, status) {
                });
      }
        
    
     $scope.setInfo = function(_workItem) {
       //the server should return a json with work_item info
       var payload = {
          work_item_id : _workItem.id
        }

      // send the payload to the server
        $http.post('/api/projects/iterations/getwork_item', payload)
           .success(function(data, status, header, config) {
              $scope.infoWorkItem.workitem = data;
              $http.post('/api/projects/iterations/workitems/getcomments', payload)
                .success(function(data, status, header, config) {
                  $scope.infoWorkItem.comments = data.comments;
                  $http.post('/api/projects/iterations/workitems/getlinks', payload)
                    .success(function(data, status, header, config) { 
                      $scope.infoWorkItem.links = [];
                      for(var j =0; j < data.links.length; j++) {
                        for(var i =0; i < $scope.workItems.length; i++) {
                          if($scope.workItems[i].id == data.links[j].work_item_id) {
                            $scope.infoWorkItem.links.push($scope.workItems[i]);
                            break;
                          }
                        }
                      }
                    })   
                    .error(function(data, status) {
                      alert(JSON.stringify(data));
                    });
                })   
                .error(function(data, status) {
                  alert(JSON.stringify(data));
                });
          })   
          .error(function(data, status) {
            alert(JSON.stringify(data));
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
            alert(JSON.stringify(data));
            var payload2 = {
              work_item_id : data.new_id
            }
            $http.post('/api/projects/iterations/getwork_item', payload2)
              .success(function(data, status, header, config) {
                  $scope.workItems.push(data);
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
              })
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
      var comment = {
        text: _content
      }
      $scope.comments.push(comment);
     }

     $scope.add_comment_modify = function(_content) {
     //  function add a comment to a work_item
      $scope.modifyWorkItem.comments.push(_content);
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
        var new_link = {
          work_item_2: link.id
        }
        $scope.linkss.push(new_link);
     }

     $scope.add_link_modify = function(link) {
     // function add new link between two work_items
        $scope.modifyWorkItem.links.push(link);
     }

     $scope.deleteLinkModify = function(link) {
     // function add new link between two work_items
        for(var i =0; i < $scope.modifyWorkItem.links.length; i++) {
          if($$scope.modifyWorkItem.links[i] == link) 
            $$scope.modifyWorkItem.links.splice(i, 1);
        }
     }

     $scope.removeLink = function(idWorkItemSource, idWorkItemDetination) {
      // function delete an existing link between two work_items
     }

    $scope.setDelete = function(_workItem) {
      // Set number work Item to Delete
      $scope.delWorkItem.work_item_id = _workItem.id;
      $scope.delWorkItem.work_item_number = _workItem.number;
    }


   $scope.setDeleteLink = function(firstWorkItem, secondWorkItem) {
       $scope.delLink.first_workItem = firstWorkItem;
       $scope.delLink.second_workItem = secondWorkItem;
   }

   $scope.setModify = function(_workItem) {
      $scope.modifyWorkItem.workitem = _workItem;
      alert(JSON.stringify(_workItem));
      //the server should return a json with work_item info
      var payload = {
        work_item_id : _workItem.id
      }
      $http.post('/api/projects/iterations/workitems/getcomments', payload)
        .success(function(data, status, header, config) {
          $scope.modifyWorkItem.comments = data.comments;
          $http.post('/api/projects/iterations/workitems/getlinks', payload)
            .success(function(data, status, header, config) {
              $scope.modifyWorkItem.links = [];
              for(var j =0; j < data.links.length; j++) {
                for(var i =0; i < $scope.workItems.length; i++) {
                  if($scope.workItems[i].id == data.links[j].work_item_id) {
                    $scope.modifyWorkItem.links.push($scope.workItems[i]);
                    break;
                  }
                }
              }
            })   
            .error(function(data, status) {
              alert(JSON.stringify(data));
            });
        })   
        .error(function(data, status) {
          alert(JSON.stringify(data));
        });
    }
  }
]);