// Copyright (c) 2017 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

var currency = '$';
var bill = billingJs.Billing.bills.new();

// demo data
bill.charges.new({ price: 8.3, name: 'Umbrella', description: 'Unmatched quality and classic design' });
bill.charges.new({ price: 135, name: 'Briefcase', description: 'High-quality ballistic nylon fabric', modifier: { percentRatio: -0.1 } });
bill.charges.new({ qty: 3, price: .65, description: 'Accessories' });
bill.payments.new({ name: 'Cash' });

var App = blocks.Application();

App.View('Billing', {
  options: {
    url: 'src/widget/billing.html'
  },
  bill: blocks.observable({
    get: function () {
      return bill;
    },

    set: function (value) {
      bill = value;
    }
  }),
  selectedItem: blocks.observable(false),
  
  editCharge: function(ev, charge) {
    console.log('edit charge', charge);
    this.selectedItem(charge);
  },

  editModifier: function(ev, modifier) {
    console.log('edit modifier', modifier);
    this.selectedItem(modifier);
  },

  editPayment: function(ev, payment) {
    console.log('edit payment', payment);
    this.selectedItem(payment);
  },

  labelForModifier: function(modifier) {
    var r = modifier.percentRatio;
    var s = r > 0 ? '+' : '';
    return (r ? s + (r * 100) + '%' : '') + (modifier.value > 0 ? 'Surcharge' : 'Discount');
  },

  money: function(value) {
    var roundedValue = (Math.round(value * 100) / 100);
    return roundedValue < 0 ? '-'+currency+(-roundedValue).toFixed(2) : currency+roundedValue.toFixed(2);
  },
  
  done: function(ev, result) {
    console.log('done', result);
    this.selectedItem(false);
  },
  
  globalModifiers: function() {
    return bill.modifiers.filter( mod => {
      return !mod.charge;
    });
  },

  showJson: function() {},

  reset: function() {
    console.log('reset');
    this.bill = billingJs.Billing.bills.new();
    blocks.query({});
  }
});

App.View('Billing', 'Modal', {
  options: {
    url: 'src/widget/modal.html'
  }
});