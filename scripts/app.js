(function () {
    'use strict'
    let app = angular.module("ngApp", [])
    app
      .controller("FriendsList",FriendsList)
      .service("shoppingService", shoppingService)
      .service("asyncService",asyncService)
    FriendsList.$inject = ['shoppingService']

    
    asyncService.$inject = ["$q","$http"]
    function asyncService($q,$http) {
        let service = this;
        
        service.getFriends = function () {
            let result = {
                message:""
            }
            //the fetch request goes
            let r = $http({
                method: 'GET',
                url: "http://localhost:3000/friends"
            })
            return r;
        }
        // service.checkQuantity = function (quantity) {
        //     let deferred = $q.defer();
        //     let result = {
        //         message:""
        //     }
        //     $timeout(function () {
        //         if (parseInt(quantity) < 5) {
        //             deferred.resolve(result)
        //         } else {
        //             result.message = "Too many entries"
        //             deferred.reject(result)
        //         }
        //     }, 1000)
        //     return deferred.promise;
        // }
    }
    shoppingService.$inject = ["$q","asyncService"]
    function shoppingService($q,asyncService) {
        let service = this;
        let friends = []
        service.addFriends = function () {
            console.log(friends)
            return friends;
        }
        service.getFriends = function() {
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
            asyncService
                .getFriends()
                .then(function (res) {
                    friends = res.data
                    console.log(res.data)
                    console.log(friends)
                })
            //let quantityPromise = asyncService.checkQuantity(quantity);

           
        }
    }
    function FriendsList(shoppingService) {
        let sl1 = this;
       sl1.friends = []

        //sl1.items = shoppingService.getItems();
        sl1.friends = shoppingService.addFriends();
        sl1.getFriends = function () {
            //shoppingFactory.addItem()
            shoppingService.getFriends()
            //console.log("getting Friends")
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