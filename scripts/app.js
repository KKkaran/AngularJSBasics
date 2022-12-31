(function () {
    'use strict'
    let app = angular.module("ngApp", [])
    app
      .controller("shoppingList1",shoppingList1)
      .service("shoppingService", shoppingService)
      .service("asyncService",asyncService)
    shoppingList1.$inject = ['shoppingService']

    
    asyncService.$inject = ["$q","$timeout"]
    function asyncService($q,$timeout) {
        let service = this;
        
        service.checkName = function (item) {
            let deferred = $q.defer();
            let result = {
                message:""
            }
            $timeout(function () {
                if (item.toLowerCase().indexOf('cookie') === -1) {
                    deferred.resolve(result)
                } else {
                    result.message = "Stay way from cookie"
                    deferred.reject(result)
                }
            }, 2000)
            return deferred.promise;
        }
        service.checkQuantity = function (quantity) {
            let deferred = $q.defer();
            let result = {
                message:""
            }
            $timeout(function () {
                if (parseInt(quantity) < 5) {
                    deferred.resolve(result)
                } else {
                    result.message = "Too many entries"
                    deferred.reject(result)
                }
            }, 1000)
            return deferred.promise;
        }
    }
    shoppingService.$inject = ["$q","asyncService"]
    function shoppingService($q,asyncService) {
        let service = this;
        let items = []
        service.addItem = function(item,quantity) {
            // let promise = asyncService.checkName(item);
            // promise
            //     .then(function (response) {
            //         return asyncService.checkQuantity(quantity)
            //     })
            //     .then(function () {
            //         items.push({item,quantity})   
            //     })
            //     .catch(function (error) {
            //         console.log(error.message)
            //     })
            let namePromise = asyncService.checkName(item);
            let quantityPromise = asyncService.checkQuantity(quantity);

            $q
                .all([namePromise, quantityPromise])
                .then(function () {
                    items.push({item,quantity})
                })
                .catch(function (error) {
                    console.log(error.message)
                })
        }
        service.getItems = function () {
            return items;
        }
    }
    function shoppingList1(shoppingService) {
        let sl1 = this;
        sl1.item = "";
        sl1.quantity = "";

        sl1.items = shoppingService.getItems();

        sl1.addItem = function () {
            //shoppingFactory.addItem()
            sl1.item && sl1.quantity && function () {
                
                    shoppingService.addItem(sl1.item, sl1.quantity)
                
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