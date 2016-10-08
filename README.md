# billing
Billing Module JS

[![npm version](https://badge.fury.io/js/billing.svg)](https://badge.fury.io/js/billing)
[![Build status](https://travis-ci.org/AlexVangelov/billing-js.svg)](https://travis-ci.org/AlexVangelov/billing-js)

    npm install billing

## Usage

### Right constructor  ([samples/node/rightConstructor.js](samples/node/rightConstructor.js))
```javascript
var Bill = require('billing').BillingBill;

var bill = new Bill(); //new Bill
bill.charges.new({ price: 1.2 }); //add charge

var charge = bill.charges.new({ qty: 2.5, price: 2.4}); //charge with quantity
charge.modify({ fixedValue: 1.5 }); //charge modifier

bill.charges.new({ price: 3, modifier: { percentRatio: 0.5 } }); //charge with percent modifier
bill.modifiers.new({ percentRatio: -0.1 }); //global modifier percent
bill.payments.new({ value: 1 }); //partial payment
bill.payments.new(); //pay the rest

// validations
charge = bill.charges.new({ price: -2 });
charge.isValid; // -> false
charge.errors; // -> [{ price: { greaterThan: 'must be greater than 0' } }, { finalValue: { greaterThanOrEqualTo: 'must be greater than or equal to 0' } }]
bill.isValid; // -> false
bill.errors; // -> [{ charges: { invalid: 'are invalid' } }]
```

### Left constructor ([samples/node/leftConstructor.js](samples/node/leftConstructor.js))
```javascript
var billing = require('billing');

var Bill = billing.BillingBill;
var Charge = billing.BillingCharge;
var Modifier = billing.BillingModifier;
var Payment = billing.BillingPayment;

var bill = new Bill();
new Charge({ bill: bill, price: 1.2 });

var charge = new Charge({ bill: bill, qty: 2.5, price: 2.4});
new Modifier({ charge: charge, fixedValue: 1.5 });

new Charge({ bill: bill, price: 3, modifier: { percentRatio: 0.5 } })

new Modifier({ bill: bill, percentRatio: -0.1 });

new Payment({ bill: bill, value: 1 });
new Payment({ bill: bill });
```

### Bill instance
```javascript
bill.charges    //Charge collection
bill.modifiers  //Modifier collection
bill.payments   //Payment collection
bill.total    //The whole number or amount (charges and modifiers)
bill.balance  //Bill remainder (total - payments)
```

### Billing collections

    <item> = <collection>.new(attributes = {})  //create
    boolean  <collection>.add(item)             //add
    boolean  <collection>.remove(item)          //destroy

### Validations

    <item>.isValid  // check validity
    <item>.errors   // errors format [{ propertyName: { validationName: 'Human readable error' }}]

## Build

    `npm run build` - Generate node library. (<project>/lib/*)
    `npm run dist`  - Generate browser library. (<project>/dist/billing.js)
    `npm test`      - Run unit tests.
