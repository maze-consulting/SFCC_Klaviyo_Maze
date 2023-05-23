'use strict';

/* API Includes */
var Logger = require('dw/system/Logger');
var ProductMgr = require('dw/catalog/ProductMgr');
var URLUtils = require('dw/web/URLUtils');
var StringUtils = require('dw/util/StringUtils');

/* Script Modules */
var klaviyoUtils = require('*/cartridge/scripts/klaviyo/utils');
var KLImageSize = klaviyoUtils.KLImageSize;


/***
 *  KL EVENT TRACKING: Prepares data for "Viewed Product" event
 *
 * @param productID - product ID (string)
 * @returns data object to be passed to the KL API
***/

function getData(productID) {

    var data;
    try {

        data = {};

        // product in viewData is flat and doesn't have all data required (to whit, categories)
        var product = ProductMgr.getProduct(productID);
        if (!product) {
            throw new Error('Product with ID [' + productID + '] not found');
        }

        // Here, we 'fork' our repo by directing SFRA sites to point to the viewedProductHelpers.js in int_klaviyo_sfra and SiteGen sites will point to viewedProductHelpers.js int_klaviyo
        // This is necessary because the SiteGen code is much more involved and requires more logic to get at the correct product prices displayed on the PDP.
        // See site specific comments about the returned prices object in each of the viewedProductHelpers.js files (Ex: int_klaviyo_sfra & int_klaviyo)
        var prices = require('*/cartridge/scripts/klaviyo/viewedProductHelpers.js').getProductPrices(product);

        data['Product ID'] = product.ID;
        data['Product Name'] = product.name;
        data['Product Page URL'] = URLUtils.https('Product-Show', 'pid', product.ID).toString();
        data['Product Image URL'] = product.getImage(KLImageSize).getAbsURL().toString();
        data['Price'] = prices.price;
        data['Price String'] = prices.priceString;
        data['Original Price'] = prices.originalPrice ? prices.originalPrice : prices.price;
        data['Original Price String'] = prices.originalPriceString ? prices.originalPriceString : prices.priceString;
        data['Product UPC'] = product.UPC;

        if(!product.master && 'masterProduct' in product) {
            data['Master Product ID'] = product.masterProduct.ID;
        }

        var categories = [];
        var catProduct = (product.variant) ? product.masterProduct : product;
        for(var i = 0, len = catProduct.categoryAssignments.length; i < len; i++) {
            categories.push(catProduct.categoryAssignments[i].category.displayName);
        }
        categories = klaviyoUtils.dedupeArray(categories);

        data['Categories'] = categories;
        data['Primary Category'] = !empty(catProduct.getPrimaryCategory()) ? catProduct.getPrimaryCategory().displayName : '';

    } catch(e) {
        var logger = Logger.getLogger('Klaviyo', 'Klaviyo.core viewedProduct.js');
        logger.error('viewedProduct.getData() failed to create data object: ' + e.message + ' ' + e.stack );
    }

    return data;
}


module.exports = {
    getData : getData
};
