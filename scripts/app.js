(function(){
    "use strict";
    let app = angular.module("ngApp", []);
    app
        .controller("squareController", SquareController)
        .controller("digestController", digestController)
        .controller("eatController", eatController)
        .controller("parentController",parentController)
        .controller("childController",childController)
        .filter("upperCase", upperCaseFilterFactory)
        .filter("squareNumber", squareNumberFactory)
        .filter("truth", truthFactory)
    
    app.$inject = ["$scope", "$filter", "upperCaseFilter", "$timeout"]

    let desserts = ["Jalebi", "IceCream", "Gulabjamun", "Bhatisa", "Rasgulla", "Milkcake"];
    let catering = [
        {
            quantity: 2,
            name: "Shahi Paneer"
        },
        {
            quantity: 4,
            name: "Dal Makhni"
        },
        {
            quantity: 3,
            name: "Palak Paneer"
        },
        {
            quantity: 2,
            name: "Chicken Tikka"
        }
    ]
    function eatController($scope) {
        $scope.desserts = desserts;
        $scope.catering = catering;
    }
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
    function parentController($scope){
        // $scope.parentValue = 99
        // $scope.pc = this;
        // $scope.pc.parentValue = 7;
        let parent = this;
        parent.value = 70;
    }
    function childController($scope){
        let child = this;
        child.value = 140;
        // $scope.pc = this
        // $scope.parentValue = 11
        // console.log($scope.$parent.pc.parentValue)
        // $scope.pc.parentValue = 123;
        // console.log('$scope.parentValue is : ' + $scope.parentValue)
        // console.log($scope)
        // console.log($scope.$parent.pc.parentValue)
    }
})()