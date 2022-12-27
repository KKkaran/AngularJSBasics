(function(){
    "use strict";
    let app = angular.module("ngApp", []);
    app
        .controller("shoppingListAddController", ShoppingListAddController)
        .controller("shoppingListShowController", ShoppingListShowController)
    
    app.$inject = ["$scope", "$timeout"]

    function ShoppingListAddController($scope) {
        let slac = this;
        slac.item = ""
        slac.quantity = 0;
        slac.list = [];
        slac.addItem = function(){
           //slac.item && console.log(slac.item + " " + slac.quantity)
           slac.list.push({item:slac.item,quant:slac.quantity})
           console.log(slac.list)
        }
    }
    function ShoppingListShowController($scope) {
        let slsc = this;
        slsc.name = ["karan","singh","sodhi"];
    }
    
})()