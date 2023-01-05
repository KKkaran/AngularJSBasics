(function(){
    "use strict";
    
    let app = angular.module("ngApp",[]);
    app 
      .controller("Shoppinglist1", ShoppingList1)
      .controller("Shoppinglist2", ShoppingList2)
      .factory("ShoppingListFactory", ShoppingListFactory)
      .directive("listItemDescription", listItemDescription)
      .directive("listItem", listItem)
    
    ShoppingList1.$inject = ["ShoppingListFactory"]
    ShoppingList2.$inject = ["ShoppingListFactory"]
    function listItem() {
        return {
            templateUrl: "listItem.html",
            scope: {
                valthruat: "@",
                valthruequal: "=",
                list: '=myList',
                title:"@titles"
            }
        }
    }
    function listItemDescription() {
        return {
            template: "{{item.item}} ---> {{item.quantity}}"
        }
    }

    function ShoppingListFactory(){
        return function(maxItems){
            return new ShoppingListService(maxItems);
        }
    }
    function ShoppingListService(maxItems){
        let service = this;
        let items = [];

        service.addItem = function(item,quantity){
            if((maxItems == undefined) || (maxItems !== undefined) && (items.length < maxItems)){
                items.push({
                    item: item,
                    quantity: quantity
                })
            }else{
                throw new Error("Max items (" + maxItems + ") reached.")
            }
        }
        service.getItems = function(){
            return items;
        }
    }
    function ShoppingList1(ShoppingListFactory){
        let sl1 = this;
        let service = ShoppingListFactory();
        sl1.valthruat = "value through @"
        sl1.valthruequal = "value through ="
        sl1.title = "Shooping List #1"
        sl1.item = "";
        sl1.quantity = "";
        sl1.items = service.getItems(); 
        
        sl1.addItem = function(){
            service.addItem(sl1.item,sl1.quantity)
        }
    }
    function ShoppingList2(ShoppingListFactory){
        let sl2 = this;
        let service = ShoppingListFactory(2);
        sl2.title = "Shooping List #2"
        sl2.item = "";
        sl2.quantity = "";
        sl2.items = service.getItems();
        
        sl2.addItem = function(){
            try{
                service.addItem(sl2.item,sl2.quantity)
            }catch(error){
                sl2.error = error.message
            }
            
        }
    }
})()