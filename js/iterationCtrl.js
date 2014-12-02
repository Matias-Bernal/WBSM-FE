'use strict';

angular.module('Wbpms')
  .controller('IterationCtrl', ['$scope', '$http', '$log',
    function ($scope, $http, $log) {

       $scope.iterations = [
            {
                idIteration:'001',
                title:'Iteration 001',
                point:'00/00',
                owner: false
            },
            {
                idIteration:'002',
                title:'Iteration 002',
                point:'00/00',
                owner: false
            },
            {
                idIteration:'003',
                title:'Iteration 003',
                point:'00/00',
                owner: false
            },
            {
                idIteration:'004',
                title:'Iteration 004',
                point:'00/00',
                owner: false
            }
        ];
        
        
      $scope.iterationModel = {
           idIteration: '',
           title: '',
           point: '',
           owner: false 
        }

    /*    $scope.clear = function() {
            $scope.newIteration.new_idIteration: '';
            $scope.newIteration.new_title: '';
            $scope.newIteration.new_point: '';
            $scope.newIteration.new_owner: ''
        }
        */
       
    

      // declaration !AND! call (see parenthesis at end of function)
      // of a function that fetches the todos from the server
     /* var init = function() {
      	  $http.get('/api/projects/'+ nameProject)
      	  .success(function(data, status, header, config) {

          // the server should return a json array wich contains all the iterations
          $scope.iterations = data;

          })
          .error(function(data, status){	
            $log.debug('Error while fetching iterations from server');
          });
                
      };   */

      $scope.init = function() {


      };


      $scope.getAllProjectIterations = function() {
      	 //shows all iterations of a project
      	 alert("get members to project");
            window.location.href = '#/projects/iterations';
            
            /*var payload = {
                nameProject : id_project,
            }
            
            $log.debug("View project Iterations");
            $http.post('/api/project/', payload)
                .success(function(data, status, header, config) {
                    $log.debug('Success get iterations');
                    $scope.iterations = data;
                })
                .error(function(data, status) {
                    $log.debug(data.error);
                });*/   
      } 

      $scope.create_iteration = function(nameProject) {  	
        //function add a iteration to the project
        alert("iteration agree to project");
        window.location.href = '#/projects/iterations';

      /*  var payload = {
                nameProject: id_project
            }

        $log.debug("Add iteration");

        // send the payload to the server
        $http.post('/api/project/', payload)
          .success(function(data, status, header, config) {
            $log.debug('Success!!: '<$scope.title> 'added successfully to ' <$scope.nameProject>);
            $scope.newIteration = data;
          })
          .error(function(data, status) {
            $log.debug(data.error);
          }); */

      }


      $scope.delete_iteration = function(nameProject, idIteration) {
      	// deletes an iteration of a project
        alert("Iteration remove to project");
        window.location.href = '#/projects/iterations';
         var payload = {
                nameProject: id_project,
                idIteration: id_iteration
            } 

          $log.debug("Removing iteration")      	
            
             // find the element in the data array and remove it
            for(var i =0; i < $scope.iterations.length; i++) {
                if($scope.iterations[i].id_iteration === idIteration) {
                    $scope.iterations.splice(i, 1);
                }
            }

          $http.delete('/api/project/{{nameProject}}/{{id_iteration}}')
              .success(function(data, status, header, config) {
                $log.debug('Success removing iteration');  

          })
          .error(function(data, status) {
            $log.debug(data.error);
          });
      }
    

   }]);