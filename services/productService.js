var products = require('../data/products.json');
var amazonProducts = require('../data/amazon_product.json');
var commentService = require('../services/commentService.js');

module.exports = {
  deleteProductsByProductList: function(productListId) {
    var i = 0;

    while (i < products.length) {
      if (products[i].product_list_id === productListId) {
        products.splice(i, 1);
      } else {
        i++;
      }
    }
  },
  getProductsForProductListId: function(productListId) {
    var productListProducts = [];
    products.forEach(function(product, index) {
      if (product.product_list_id == productListId) {
        var amazonProduct = getProductDetailsForProduct(product);
        amazonProduct.up_votes = product.up_votes;
        amazonProduct.down_votes = product.down_votes;
        amazonProduct.id = product.id;
        amazonProduct.comments = commentService.getCommentsGivenProductId(product.id);
        productListProducts.push(amazonProduct);
      }
    });
    return productListProducts;
  },
  getProductGivenProductId: function(productId) {
    var productRet;
    products.forEach(function(product, index) {
      if (product.id == productId){
        productRet = product;
        return;
      }
    });
    return productRet;
  },
  getAllAmazonProducts: function() {
    return amazonProducts;
  },
  getAllProducts: function() {
    return products;
  }
}

var getProductDetailsForProduct = function(productObj) {
  var productAsin = productObj.amazon_asin;
  var amazonProductReturn;
  amazonProducts.forEach(function(amazonProduct, index) {
    if (amazonProduct.asin == productAsin) {
      amazonProductReturn = amazonProduct;
      return;
    }
  });
  return amazonProductReturn;
}
