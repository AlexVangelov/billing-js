'use strict'
var billing = require('../../../lib');

billing.Billing.config({

});

console.log('Done', new billing.BillingDynamoDbStore());