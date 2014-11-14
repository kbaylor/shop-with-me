var productLists = require('../data/product_lists.json');
var sharedProductLists = require('../data/product_list_share.json');

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
    //Not Tested
    var sharedProductListsRet = [];
    sharedProductLists.forEach(function(sharedProductList, index) {
      if (sharedProductList.user_id == userId){
        //We found a match, so get the productList with this Id
        var productList = getProductListsFromId(sharedProductList.product_list_id);
        sharedProductListsRet.push(productList);
      }
    });
    return sharedProductListsRet;
  }
}

var getProductListsFromId = function(productListId){
  var productListRet;
  productLists.forEach(function(productList, index) {
    if (productList.id == productListId){
      productListRet = productList;
      return;
    }
  });
  return productListRet;
}
