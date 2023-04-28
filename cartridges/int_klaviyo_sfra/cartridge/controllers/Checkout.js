'use strict';

var server = require('server');
var startedCheckoutHelper = require('*/cartridge/scripts/klaviyo/checkoutHelpers').startedCheckoutHelper;

server.extend(module.superModule);

server.append('Begin', function (req, res, next) {
    res.viewData.klid = startedCheckoutHelper(true);
    next();
});


module.exports = server.exports();