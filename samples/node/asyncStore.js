var billing = require('../../').Billing;
var indexedDbStore = require('../../lib/billing/storable/indexedDbStore').Store;

billing.config({
  store: indexedDbStore
});

var bill = billing.bills.new();

bill.charges.new({ price: 1 }); // -> { qty: 1, price: 20.5, name: 'Pizza', taxRatio: 0.2 }
bill.payments.new(); // -> { name: 'Cash', value: 20.5, isCash: true, isFiscal: true }

console.log(bill.toJson());