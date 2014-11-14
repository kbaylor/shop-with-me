'use-strict';
var productLists = require('../data/product_lists.json');
var sharedProductLists = require('../data/product_list_share.json');
var productService = require('../services/productService.js');
var productListIncrementId = 3;

module.exports = {
  deleteProductList: function(productListId) {
    // Delete all of the products from the product list
    productService.deleteProductsByProductList(productListId);

    // Delete the product list
    var productListIndex = -1;

    productLists.forEach(function(productList, index) {
      if (productList.id == productListId) {
        productListIndex = index;
      }
    });

    if (productListIndex != -1){
      productLists.splice(productListIndex, 1);
    }
  },
  addItemToProductList: function(productListId, productAsin){
    productService.createProduct(productListId, productAsin); 
  },
  createList: function(title, ownerId) {
    var productList = {};
    productList.title = title;
    productList.id = productListIncrementId;
    productListIncrementId ++;
    productList.owner_id = ownerId;
    productList.date_created = new Date();
    productLists.push(productList);
    return productList;
  }, 
  getOwnedProductLists: function(userId) {
    var userProductLists = [];
    productLists.forEach(function(productList, index) {
      if (productList.owner_id == userId) {
        userProductLists.push(productList);
      }
    });
    return userProductLists;
  },
  getSharedProductLists: function(userId) {
    var sharedProductListsRet = [];
    sharedProductLists.forEach(function(sharedProductList, index) {
      if (sharedProductList.user_id == userId){
        //We found a match, so get the productList with this Id
        var productList = getProductListFromId(sharedProductList.product_list_id);
        productList.done_voting = sharedProductList.done_voting;
        sharedProductListsRet.push(productList);
      }
    });
    return sharedProductListsRet;
  },
  getUnSharedProductLists: function(userId) {
    var unSharedProductListsRet = [];
    sharedProductLists.forEach(function(sharedProductList, index) {
      if (sharedProductList.user_id != userId){
        //We found a list the user isn't shared, so get the productList with this Id
        var productList = getProductListFromId(sharedProductList.product_list_id);
        productList.done_voting = sharedProductList.done_voting;
        unSharedProductListsRet.push(productList);
      } 
    });
    return unSharedProductListsRet;
  },
  getProductListGivenProductListId : function(productListId){
    return getProductListFromId(productListId);
  },
  updateSharedProductListToFinishedForUser : function(productListId, userId){
    sharedProductLists.forEach(function(sharedProductList, index) { 
      if (sharedProductList.product_list_id == productListId &&
          sharedProductList.user_id == userId) {
        sharedProductList.done_voting = 1;        
      }
    }); 
  }, 
  deleteProductFromProductList: function(productId) {
    var products = productService.getAllProducts();
    //Get the productIndex and remove that product from the list
    var productIndex = getProductIndexFromProductList(products, productId);
    if (productIndex != -1){
      products.splice(productIndex, 1);
    }
  },
  getProductList: function(productListId) {
    return getProductListFromId(productListId);
  }
};

var getProductIndexFromProductList = function(products, productId) {
  var productIndexRet = -1;
  products.forEach(function(product, index) {
    if (product.id == productId) {
      productIndexRet = index;
      return;
    }
  });
  return productIndexRet;
};

var getProductListFromId = function(productListId){
  var productListRet;
  productLists.forEach(function(productList, index) {
    if (productList.id == productListId){
      productListRet = productList;
      return;
    }
  });
  return productListRet;
};
