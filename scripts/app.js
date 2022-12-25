(function(){
    "use strict";
    let app = angular.module("ngApp", []);
    app
        .controller("squareController", SquareController)
        .controller("digestController",digestController)
        .filter("upperCase", upperCaseFilterFactory)
        .filter("squareNumber", squareNumberFactory)
        .filter("truth", truthFactory)
    
    app.$inject = ["$scope", "$filter", "upperCaseFilter", "$timeout"]

    function digestController($scope,$timeout) {
        $scope.counterValue = 0;
        //$scope.lname = "Last name"
        $scope.add = function () {
            //console.log(++$scope.counterValue);
            $timeout(() => {
                console.log(++$scope.counterValue)
                // $scope.$digest()
            }, 3000);
        }
        $scope.show = function () {
            console.log($scope.$$watchersCount)
        }
    }
    function SquareController($scope, $filter, upperCaseFilter, squareNumberFilter) {
        $scope.number = 0
        $scope.name = ""
        $scope.changeName = function () {
            console.log(upperCaseFilter($scope.name))
        }
    }
    function squareNumberFactory() {
        return function (input) {
            return Math.pow(input, 2);
        }
    }
    function truthFactory() {
        return function (input, target, replace) {
            input = input || "";
            input = input.replace(target, replace);
            return input;
        }
    }
    function upperCaseFilterFactory($filter) {
        return function (input) {
            return $filter("uppercase")(input);
        }
    } 
})()