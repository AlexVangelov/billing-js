// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

var billing = require('../../');

//extract direct classes
var Bill = billing.BillingBill;
var Charge = billing.BillingCharge;
var Modifier = billing.BillingModifier;
var Payment = billing.BillingPayment;

//new Bill and Charge
var bill = new Bill();
new Charge({ bill: bill, price: 1.2 });

//Charge and charge Modifier
var charge = new Charge({ bill: bill, qty: 2.5, price: 2.4});
new Modifier({ charge: charge, fixedValue: 1.5 });

//Charge with modifier +50%
new Charge({ bill: bill, price: 3, modifier: { percentRatio: 0.5 } })

//Global Modifier -10% discount
new Modifier({ bill: bill, percentRatio: -0.1 });

//partial Payment $1
new Payment({ bill: bill, value: 1 });

//Pay the rest
new Payment({ bill: bill });

console.log('Total: $' + bill.total().toFixed(2));
console.log('Charges: $' + bill.charges.sum().toFixed(2) + ' (' + bill.charges.length + ')');
console.log('Modifiers: $' + bill.modifiers.sum().toFixed(2) + ' (' + bill.modifiers.length + ')');
console.log('Payments: $' + bill.payments.sum().toFixed(2) + ' (' + bill.payments.length + ')');
console.log('Balance: $' + bill.balance().toFixed());