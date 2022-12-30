(function () {
    'use strict'
    let app = angular.module("ngApp", [])
    app
      .controller("shoppingList1",shoppingList1)
      .controller("shoppingList2",shoppingList2)
      .factory("shoppingFactory",shoppingFactory)
    app.$inject = ['shoppingFactory']

    function shoppingService(maxItems) {
        let service = this;
        let items = []
        service.addItem = function(item,quantity) {
            if (maxItems == undefined || (maxItems !== undefined && items.length < maxItems)) {
                items.push({
                    item: item,
                    quantity: quantity
                })
                console.log(items)
            } else {
                throw new Error("max item(s) " + maxItems + " reached.")
            }
        }
        service.getItems = function () {
            return items;
        }
    }
    function shoppingFactory() {
        return function (maxItems) {
            return new shoppingService(maxItems)
        }
    }
    function shoppingList1(shoppingFactory) {
        let sl1 = this;
        sl1.item = "";
        sl1.quantity = "";

        let service = shoppingFactory();
        sl1.items = service.getItems();

        sl1.addItem = function () {
            //shoppingFactory.addItem()
            sl1.item && sl1.quantity && function () {
                service.addItem(sl1.item, sl1.quantity)
            }()
        }
    }
    function shoppingList2(shoppingFactory) {
        let sl2 = this;
        sl2.item = "";
        sl2.quantity = "";

        let service = shoppingFactory(3);
        sl2.items = service.getItems();

        sl2.addItem = function () {
            //shoppingFactory.addItem()
            sl2.item && sl2.quantity && function () {
                try {
                    service.addItem(sl2.item, sl2.quantity)
                } catch (error) {
                    sl2.error = error
                }
            }()
        }
    }














})()

























// (function(){
//     "use strict";
//     let app = angular.module("ngApp",[]);
//     app 
//      // .controller("Shoppinglist1", ShoppingList1)
//       .controller("Shoppinglist2", ShoppingList2)
//      // .factory("ShoppingListFactory", ShoppingListFactory);
//       .provider("ShoppingListService",ShoppingListServiceProvider)
//       .config(Config)
      
//     Config.$inject = ['ShoppingListServiceProvider']
//     function Config(ShoppingListServiceProvider){
//         ShoppingListServiceProvider.defaults.maxItems = 3;
//     }
//     //ShoppingList1.$inject = ["ShoppingListFactory"]
//     ShoppingList2.$inject = ["ShoppingListService"]
//     function ShoppingListServiceProvider(){
//         let provider = this;
//         provider.defaults = {
//             maxItems : 3
//         }
//         provider.$get = function(){
//             let sl = new ShoppingListService(provider.defaults.maxItems)
//             return sl;
//         }
//     }
//     function ShoppingListFactory(){
//         return function(maxItems){
//             return new ShoppingListService(maxItems);
//         }
//     }
//     function ShoppingListService(maxItems){
//         let service = this;
//         let items = [];
//         service.addItem = function(item,quantity){
//             if((maxItems == undefined) || (maxItems !== undefined) && (items.length < maxItems)){
//                 items.push({
//                     item: item,
//                     quantity: quantity
//                 })
//             }else{
//                 throw new Error("Max items (" + maxItems + ") reached.")
//             }
//         }
//         service.getItems = function(){
//             return items;
//         }
//     }
//     // function ShoppingList1(ShoppingListFactory){
//     //     let sl1 = this;
//     //     let service = ShoppingListFactory();

//     //     sl1.item = "";
//     //     sl1.quantity = "";
//     //     sl1.items = service.getItems();
        
//     //     sl1.addItem = function(){
//     //         service.addItem(sl1.item,sl1.quantity)
//     //     }
//     // }
//     function ShoppingList2(ShoppingListService){
//         let sl2 = this;
//         //let service = ShoppingListFactory(2);
//         sl2.item = "";
//         sl2.quantity = "";
//         sl2.items = ShoppingListService.getItems();
//         sl2.addItem = function(){
//             try{
//                 ShoppingListService.addItem(sl2.item,sl2.quantity)
//             }catch(error){
//                 sl2.error = error.message
//             }  
//         }
//     }
// })()