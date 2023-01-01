(function () {
    'use strict'
    let app = angular.module("ngApp", [])
    app
      .controller("FriendsList",FriendsList)
      .service("shoppingService", shoppingService)
      .service("asyncService",asyncService)
    FriendsList.$inject = ['shoppingService']
    
    asyncService.$inject = ["$http"]
    function asyncService($http) {
        let service = this;
        //the fetch request goes
        service.getFriends = function () {
            return $http({
                method: 'GET',
                url: "http://localhost:3000/friends"
            })
        }
        service.getDetail = function (names) {
            console.log('getting details')
            return $http({
                method: 'GET',
                url: "http://localhost:3000/friends",
                params: {
                    name: names
                }
            })
        }
    }
    shoppingService.$inject = ["asyncService"]
    function shoppingService(asyncService) {
        let service = this;
        service.getFriends = function() {
           return asyncService.getFriends()
        }
        service.getDetail = function(name) {
           return asyncService.getDetail(name)
        }
    }
    function FriendsList(shoppingService) {
        let sl1 = this;
        sl1.friends = []

        sl1.getFriends = function () {
            shoppingService
                .getFriends()
                .then(function (res) {
                    sl1.friends = res.data
                    console.log(res.data)
                })
        }
        sl1.getDetail = function (name) {
            console.log(name)
            shoppingService
                .getDetail(name)
                .then(function (res) {
                    console.log(res.data[0].since)
                })
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