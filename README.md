# billing
Billing Module JS

    npm install billing

## Usage
### Left contructor ([samples/node/leftConstructor.js](samples/node/leftConstructor.js))
```javascript
var billing = require('billing');

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
```

### Right constructor  ([samples/node/rightConstructor.js](samples/node/rightConstructor.js))
```javascript
var billing = require('../../');

var Bill = billing.BillingBill;

var bill = new Bill();
bill.charges.new({ price: 1.2 });

var charge = bill.charges.new({ qty: 2.5, price: 2.4});
charge.modify({ fixedValue: 1.5 });

bill.charges.new({ price: 3, modifier: { percentRatio: 0.5 } })
bill.modifiers.new({ percentRatio: -0.1 });
bill.payments.new({ value: 1 });
bill.payments.new();
```

### Bill instance
```javascript
bill.charges    //Charge collection
bill.modifiers  //Modifier collection
bill.payments   //Payment collection
bill.total()    //The whole number or amount (charges and modifiers)
bill balance()  //Bill remainder (total - payments)
```

### Billing collections

    <item> = <collection>.new(attributes = {})  //create
    boolean  <collection>.add(item)             //add
    boolean  <collection>.remove(item)          //destroy

## Build

    `npm run build` - Generate node library. (<project>/lib/*)
    `npm run dist`  - Generate browser library. (<project>/dist/billing.js)
    `npm test`      - Run unit tests.