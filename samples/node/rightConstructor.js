// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

var billing = require('../../');

//extract Bill class
var Bill = billing.BillingBill;

//new Bill and Charge
var bill = new Bill();
bill.charges.new({ price: 1.2 });

//Charge and charge Modifier
var charge = bill.charges.new({ qty: 2.5, price: 2.4});
charge.modify({ fixedValue: 1.5 });

//Charge with modifier +50%
bill.charges.new({ price: 3, modifier: { percentRatio: 0.5 } })

//Global Modifier -10% discount
bill.modifiers.new({ percentRatio: -0.1 });

//partial Payment $1
bill.payments.new({ value: 1 });

//Pay the rest
bill.payments.new();

console.log('Total: $' + bill.total().toFixed(2));
console.log('Charges: $' + bill.charges.sum().toFixed(2) + ' (' + bill.charges.length + ')');
console.log('Modifiers: $' + bill.modifiers.sum().toFixed(2) + ' (' + bill.modifiers.length + ')');
console.log('Payments: $' + bill.payments.sum().toFixed(2) + ' (' + bill.payments.length + ')');
console.log('Balance: $' + bill.balance().toFixed());
// console.log(bill);
