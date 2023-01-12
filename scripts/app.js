
(function(){
    "use strict";
    
    let app = angular.module("ngApp",[]);
     
    app.controller("friends",["$scope","$http","$q",Friends])
     
    function Friends($scope, $http, $q) {
        $scope.show = true;
        
        let promiseList = [promise1()]

        $scope.show && promiseList.push(promise2())

        function callback() {
            console.log("this is the callback called")
        }

        function ff(callback) {
            callback()
        }
        ff(callback)
        $q
            .all(promiseList)
        // //     .then(function ([pr1, pr2]) {
        // //    pr1 && console.log(pr1)
        // //    pr2 && console.log(pr2)
            
        // })

        //runs everytime page loads
        function promise1() {
            const pr =  new Promise(function (res,rej) {
                setTimeout(function () {
                    res("now returning promise 1")
                },2000)
            })
            pr.then(function (res) {
                console.log(res)
            })
            .catch(function (er) {
                console.log(er)
            })
        }
        //promise si returned conditionally on checkbox 'true'
        function promise2() {
            const pr =  new Promise(function (res,rej) {
                setTimeout(function () {
                    res("now returning promise 2")
                },1000)
            })
            pr.then(function (res) {
                console.log(res)
            })
            .catch(function (er) {
                console.log(er)
            })
        }

    }
    
})()