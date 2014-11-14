var productLists = require('../data/product_lists.json');
var sharedProductLists = require('../data/product_list_share.json');
var productService = require('../services/productService.js');

module.exports = {
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
        sharedProductListsRet.push(productList);
      }
    });
    return sharedProductListsRet;
  },
  deleteProductFromProductList: function(productId) {
    var products = productService.getAllProducts();
    //Get the productIndex and remove that product from the list
    var productIndex = getProductIndexFromProductList(products, productId);
    if (productIndex != -1){
      products.splice(productIndex, 1);
    }
  }
}

var getProductIndexFromProductList = function(products, productId) {
  var productIndexRet = -1;
  products.forEach(function(product, index) {
    if (product.id == productId) {
      productIndexRet = index;
      return;
    }
  });
  return productIndexRet;
}

var getProductListFromId = function(productListId){
  var productListRet;
  productLists.forEach(function(productList, index) {
    if (productList.id == productListId){
      productListRet = productList;
      return;
    }
  });
  return productListRet;
}
