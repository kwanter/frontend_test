var app = angular.module('toDoList', []);
app
  .controller('ToDoController', ['$scope', function ($scope) {
    $scope.tasks = [];
    $scope.editIndex = false;
    $scope.addTask = function () {
        if( $scope.editIndex === false){
            $scope.tasks.push({task: $scope.task, done: false})
        } else {
            $scope.tasks[$scope.editIndex].task = $scope.task;
        }
        $scope.editIndex = false;
        $scope.task = '';
    }
        
    $scope.editTask = function (index) {
      $scope.task = $scope.tasks[index].task;
      $scope.editIndex = index;
    }
    $scope.doneTask = function (index) {
      $scope.tasks[index].done = true;
    }
    $scope.unDoneTask = function (index) {
      $scope.tasks[index].done = false;
    }
    $scope.deleteTask = function (index) {
      $scope.tasks.splice(index, 1);
    }
  }])
  .controller('main', ['weatherService',
    function (weatherService) {
      var vm = this;
      vm.Search = function() {

        weatherService.GetWeather(vm.query)
          .then(function(data) {

            // Copy data from the service into the model
            vm.City = data.City;
            vm.Condition = data.Condition;
            vm.Description = data.Description;
            vm.IconUrl = data.IconUrl;
            vm.Temperatures = data.Temperatures;
            vm.Wind = data.Wind;
            vm.Gusts = data.Gusts;
            vm.Humidity = data.Humidity;

            // If we got this far, we have good data
            vm.ValidDataLoaded = true;

          })

        .catch (function(message) {

            vm.error = message;
            vm.ValidDataLoaded = false;

          });

      };
    }
  ]);