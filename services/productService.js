var products = require('../data/products.json');
var amazonProducts = require('../data/amazon_product.json');

module.exports = {
  getProductsForProductListId: function(productListId) {
    var productListProducts = [];
    products.forEach(function(product, index) {
      if (product.product_list_id == productListId) {
        var amazonProduct = getProductDetailsForProduct(product);
        amazonProduct.up_votes = product.up_votes;
        amazonProduct.down_votes = product.down_votes;
        amazonProduct.id = product.id;
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
