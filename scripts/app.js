(function(){
    "use strict";
    let app = angular.module("ngApp", []);
    app
        .controller("squareController", SquareController)
        .filter("upperCase", upperCaseFilterFactory)
        .filter("squareNumber",squareNumberFactory)
    app.$inject = ["$scope","$filter","upperCaseFilter"]
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
    function upperCaseFilterFactory($filter) {
        return function (input) {
            return $filter("uppercase")(input);
        }
    }
})()