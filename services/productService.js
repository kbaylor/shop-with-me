'use-strict';
var products = require('../data/products.json');
var amazonProducts = require('../data/amazon_product.json');
var commentService = require('../services/commentService.js');
var productIncrementId = 1000;

module.exports = {
  deleteProductsByProductList: function(productListId) {
    var i = 0;

    while (i < products.length) {
      if (products[i].product_list_id == productListId) {
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
  getProductDetailsGivenProduct: function(product){
    return getProductDetailsForProduct(product);
  },
  getAllAmazonProducts: function() {
    return amazonProducts;
  },
  getAllProducts: function() {
    return products;
  },
  createProduct: function(productListId, productAsin) {
    var product = {};
    product.amazon_asin = productAsin;
    product.product_list_id = productListId;
    product.up_votes = 0;
    product.down_votes = 0;
    product.id = productIncrementId;
    productIncrementId++;
    products.push(product);
  }
};

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
};
