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

console.log(bill.toJson());