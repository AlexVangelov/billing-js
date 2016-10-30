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
bill.toJson() //A JSON object (without circular references)
```

### Billing collections

    <item> = <collection>.new(attributes = {})  //create
    boolean  <collection>.add(item)             //add
    boolean  <collection>.remove(item)          //destroy

### Validations

    boolean <item>.isValid  // check validity
    <item>.errors   // errors format [{ propertyName: { validationName: 'Human readable error' }}]

### Other

    <item>.state // Unused instance variable available for UI purposes

## Using the nomenclature ([samples/node/usingNomenclature.js](samples/node/usingNomenclature.js))
```javascript
var billing = require('../../').Billing;

billing.config({
  nomenclature: {
    taxGroups: [
      { id: 1, name: '20%', percentRatio: 0.2 },
      { id: 2, name: '9%', percentRatio: 0.09 }
    ],
    departments: [
      { id: 1, name: 'Food', taxGroupId: 1 },
      { id: 2, name: 'Accommodation', taxGroupId: 2 }
    ],
    plus: [
      { id: 1, name: 'Pizza', departmentId: 1, price: 20.5 },
      { id: 2, name: 'Steak', departmentId: 1, price: 30.2 },
      { id: 3, name: 'Room',  departmentId: 2, price: 200 }
    ],
    paymentTypes: [
      { id: 1, name: 'Cash', isCash: true, isFiscal: true },
      { id: 2, name: 'Card', isCash: false, isFiscal: true },
      { id: 3, name: 'External', isCash: false, isFiscal: false }
    ]
  }
});

var bill = billing.bills.new();

bill.charges.new({ pluId: 1 }); // -> { qty: 1, price: 20.5, name: 'Pizza', taxRatio: 0.2 }
bill.charges.new({ qty: 2, price: 150, departmentId: 2 });
bill.payments.new({ paymentTypeId: 1 }); // -> { name: 'Cash', value: 20.5, isCash: true, isFiscal: true }

bill.toJson(); // -> { 
//   charges:                                                                                                                   
//    [ { qty: 1, price: 20.5, name: 'Pizza', taxRatio: 0.2 },                                                                  
//      { qty: 2, price: 150, name: 'Accommodation', taxRatio: 0.09 } ],                                                        
//   payments: [ { name: 'Cash', value: 320.5, isCash: true, isFiscal: true } ] }
```

## Build

    `npm run build` - Generate node library. (<project>/lib/*)
    `npm run dist`  - Generate browser library. (<project>/dist/billing.js)
    `npm test`      - Run unit tests.
