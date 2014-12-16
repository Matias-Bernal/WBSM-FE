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
      };

      $scope.delLink = {
        first_workItem : '',
        second_workItem : ''
      };

      $scope.modifyWorkItem = {
        workitem : {},
        comments : [],
        _links : []
      };

      $scope.modifyWorkItemToAdd = {
        workitem : {},
        comments : [],
        _links : []
      };

      $scope.modifyWorkItemToRemove = {
        workitem : {},
        comments : [],
        _links : []
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
      //Update workitem messagges //
      $scope.updateSuccessMsgVisible = false;
      $scope.updateErrorMsgVisible = false;  
    
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
                  $scope.updateSuccessMsgVisible = false;
                  $scope.updateErrorMsgVisible = false;
              })
              .error(function(data, status) {
                  $scope.addSuccessMsgVisible = false;
                  $scope.addErrorMsgVisible = true;
                  $scope.renameSuccessMsgVisible = false;
                  $scope.renameErrorMsgVisible = false;
                  $scope.removeSuccessMsgVisible = false;
                  $scope.removeErrorMsgVisible = false; 
                  $scope.updateSuccessMsgVisible = false;
                  $scope.updateErrorMsgVisible = false;
              })
          })          
          .error(function(data, status) {
            $scope.addSuccessMsgVisible = false;
            $scope.addErrorMsgVisible = true;
            $scope.renameSuccessMsgVisible = false;
            $scope.renameErrorMsgVisible = false;
            $scope.removeSuccessMsgVisible = false;
            $scope.removeErrorMsgVisible = false;
            $scope.updateSuccessMsgVisible = false;
            $scope.updateErrorMsgVisible = false;
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
              $scope.updateSuccessMsgVisible = false;
              $scope.updateErrorMsgVisible = false;
            })
            .error(function(data, status) {
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = true;
              $scope.updateSuccessMsgVisible = false;
              $scope.updateErrorMsgVisible = false;               
            }); 
      }

      $scope.modify_work_item = function(_modifyWorkItem){
          var payload = {
              work_item_id : _modifyWorkItem.workitem.id,
              nb_iteration : _modifyWorkItem.workitem.nb_iteration,
              project : _modifyWorkItem.workitem.project,
              name : _modifyWorkItem.workitem.name,
              description : _modifyWorkItem.workitem.description,
              points : _modifyWorkItem.workitem.points,
              status : _modifyWorkItem.workitem.status,
              owner : _modifyWorkItem.workitem.owner
          };
          // send the payload to the server
          $http.post('/api/projects/iterations/workitems/update', payload)
            .success(function(data, status, header, config) {
              $log.debug('Work Item info updated.');
            })
            .error(function(data, status) {
              $scope.addSuccessMsgVisible = false;
              $scope.addErrorMsgVisible = false;
              $scope.renameSuccessMsgVisible = false;
              $scope.renameErrorMsgVisible = false;
              $scope.removeSuccessMsgVisible = false;
              $scope.removeErrorMsgVisible = false;
              $scope.updateSuccessMsgVisible = false;
              $scope.updateErrorMsgVisible = true;               
            });

            for(var i = 0; i < $scope.modifyWorkItemToAdd.comments.length; i++) {
                $http.post('/api/projects/iterations/workitems/comments', $scope.modifyWorkItemToAdd.comments[i])
                  .success(function(data, status, header, config) {
                      $log.debug('Comment added.');
                   })
                  .error(function(data, status) {
                    $scope.addSuccessMsgVisible = false;
                    $scope.addErrorMsgVisible = false;
                    $scope.renameSuccessMsgVisible = false;
                    $scope.renameErrorMsgVisible = false;
                    $scope.removeSuccessMsgVisible = false;
                    $scope.removeErrorMsgVisible = false;
                    $scope.updateSuccessMsgVisible = false;
                    $scope.updateErrorMsgVisible = true;               
                  });
            }
            $scope.modifyWorkItem.workitem = {};
            $scope.modifyWorkItemToAdd.workitem = {};
            $scope.modifyWorkItemToAdd.comments = [];
            $scope.modifyWorkItem.comments = [];

            for(var i = 0; i < $scope.modifyWorkItemToAdd._links.length; i++) {
              $http.post('/api/projects/iterations/workitems/links', $scope.modifyWorkItemToAdd._links[i])
                .success(function(data, status, header, config) {
                  $log.debug('Links added...');
                })
                .error(function(data, status) {
                  $scope.addSuccessMsgVisible = false;
                  $scope.addErrorMsgVisible = false;
                  $scope.renameSuccessMsgVisible = false;
                  $scope.renameErrorMsgVisible = false;
                  $scope.removeSuccessMsgVisible = false;
                  $scope.removeErrorMsgVisible = false;
                  $scope.updateSuccessMsgVisible = false;
                  $scope.updateErrorMsgVisible = true;               
                });
            }
            $scope.modifyWorkItemToAdd._links = [];

            for(var i = 0; i < $scope.modifyWorkItemToRemove._links.length; i++) {
              $http.post('/api/projects/iterations/workitems/links/delete', $scope.modifyWorkItemToRemove._links[i])
                .success(function(data, status, header, config) {
                  $log.debug('Links deleted...');
                })
                .error(function(data, status) {
                  $scope.addSuccessMsgVisible = false;
                  $scope.addErrorMsgVisible = false;
                  $scope.renameSuccessMsgVisible = false;
                  $scope.renameErrorMsgVisible = false;
                  $scope.removeSuccessMsgVisible = false;
                  $scope.removeErrorMsgVisible = false;
                  $scope.updateSuccessMsgVisible = false;
                  $scope.updateErrorMsgVisible = true;               
                });
            }
            $scope.modifyWorkItemToRemove._links = [];
            $scope.modifyWorkItem._links = [];

            $scope.addSuccessMsgVisible = false;
            $scope.addErrorMsgVisible = false;
            $scope.renameSuccessMsgVisible = false;
            $scope.renameErrorMsgVisible = false;
            $scope.removeSuccessMsgVisible = false;
            $scope.removeErrorMsgVisible = false;
            $scope.updateSuccessMsgVisible = true;
            $scope.updateErrorMsgVisible = false;
      }

      $scope.add_comment = function(_content) {
        //  function add a comment to a work_item
        var comment = {
          text: _content
        }
        $scope.comments.push(comment);
      }

      $scope.add_link = function(link) {
        // function add new link between two work_items
        var new_link = {
          work_item_2: link.id
        }
        $scope.linkss.push(new_link);
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

      $scope.add_comment_modify = function(_content) {
        //  function add a comment to a work_item
        var new_comment = {
          date: '',
          content: _content,
          author: $scope.usuario.email
        }
        var _new_comment = {
          work_item_id: $scope.modifyWorkItem.workitem.id,
          comment: _content
        }
        $scope.modifyWorkItem.comments.push(new_comment);
        $scope.modifyWorkItemToAdd.comments.push(_new_comment);
        _content = '';
      }

      $scope.add_link_modify = function(link) {
        // function add new link between two work_items
        var new_link = {
           id_work_item_source : $scope.modifyWorkItem.workitem.id,
           id_work_item_destination : link.id
        }
        var exist = false;
        for(var j = 0; j < $scope.modifyWorkItem._links.length; j++) {
          if($scope.modifyWorkItem._links[j].work_item_id == link.id)
            exist = true;
        }
        if(!exist){
          $scope.modifyWorkItem._links.push(link);
          $scope.modifyWorkItemToAdd._links.push(new_link);
        }
      }

      $scope.deleteLinkModify = function(link) {
        // function remove a link if list of links
        for(var i =0; i < $scope.modifyWorkItem._links.length; i++) {
          if($scope.modifyWorkItem._links[i].id == link.id) {
            var deletelink = {
              work_item1 : $scope.modifyWorkItem.workitem.id,
              work_item2 : link.id
            };
            $scope.modifyWorkItemToRemove._links.push(deletelink);
            $scope.modifyWorkItem._links.splice(i, 1);
          }
        }
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
        //the server should return a json with work_item info
        var payload = {
          work_item_id : _workItem.id
        }
        $scope.modifyWorkItem.comments = [];
        $http.post('/api/projects/iterations/workitems/getcomments', payload)
          .success(function(data, status, header, config) {
            $scope.modifyWorkItem.comments = data.comments;
            $http.post('/api/projects/iterations/workitems/getlinks', payload)
              .success(function(data, status, header, config) {
                $scope.modifyWorkItem._links = [];
                for(var j =0; j < data.links.length; j++) {
                  for(var i =0; i < $scope.workItems.length; i++) {
                    if($scope.workItems[i].id == data.links[j].work_item_id) {
                      $scope.modifyWorkItem._links.push($scope.workItems[i]);
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