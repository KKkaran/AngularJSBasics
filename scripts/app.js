(function(){
    "use strict";
    let app = angular.module("ngApp", []);
    app
        .controller("shoppingListAddController", ShoppingListAddController)
        .controller("shoppingListShowController", ShoppingListShowController)
        .service("ShoppingListService",ShoppingListService)
    
    app.$inject = ["$scope", "$timeout"]
    ShoppingListAddController.$inject = ['ShoppingListService'];
    ShoppingListShowController.$inject = ['ShoppingListService'];
    function ShoppingListService(){
        let service = this;
        let items = []

        service.addItem = function(itemName,quantity){
            let item = {
                item: itemName,
                quantity: quantity
            }
            items.push(item);
        }
        service.getItems = function(){
            return items;
        }
        //method to remove the item from the array
    }
    function ShoppingListAddController(ShoppingListService) {
        let slac = this;
        slac.item = ""
        slac.quantity = 0;

        slac.addItem = function(){
            slac.item && ShoppingListService.addItem(slac.item,slac.quantity)
        }
    }
    function ShoppingListShowController(ShoppingListService) {
        let slsc = this;
        slsc.list = ShoppingListService.getItems()

        //method to remove the item from Service
    }
    
})()