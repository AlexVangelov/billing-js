import { Billing, BillingBill } from '../../../';
import { Store as IndexedDbStore } from './';

describe('IndexedDbStore Integration', ()=> {

  beforeAll((done)=>{
    let store = new IndexedDbStore('TestBillingDb');
    Billing.config({
      store: store
    }, (err, db)=> {
      if (!err) {
        store.reset(done);
      }
    });
  });

  it('find non existing', (done)=>{
    BillingBill.find(1, (bill)=>{}).catch((err: Error)=> {
      expect(err.message).toEqual('Not Found');
      done();
    });
  });

  it('create', (done)=> {
    let bill = Billing.bills.new();
    bill.save((record)=> {
      BillingBill.find(record.id, (bill)=>{
        expect(bill.id).toBeDefined();
        done();
      });
    });
  });

  it('bill with charge', (done)=> {
    let bill = Billing.bills.new();
    bill.charges.new({ price: 1.6 });
    expect(bill.charges.length).toEqual(1);
    bill.save((record)=> {
      expect(record.id).toBeDefined();
      BillingBill.find(record.id, (savedBill)=>{
        expect(savedBill.id).toBeDefined();
        expect(savedBill.charges.length).toEqual(1);
        if (savedBill.charges.length) {
          let charge = savedBill.charges[0];
          expect(charge.bill).toBeDefined();
          expect(charge.bill.id).toBeDefined();
          expect(charge.billId).toEqual(savedBill.id);
          expect(charge.id).toBeDefined();
          expect(charge.price).toEqual(1.6);
        }
        expect(savedBill.toJson()).toEqual(bill.toJson());
        done();
      });
    });
  });

  it('bill with charge and global modifier', (done)=> {
    let bill = Billing.bills.new();
    bill.charges.new({ price: 2.6 });
    bill.modifiers.new({ fixedValue: -1.6 });
    expect(bill.charges.length).toEqual(1);
    expect(bill.modifier.fixedValue).toEqual(-1.6);
    bill.save((record)=> {
      expect(record.id).toBeDefined();
      BillingBill.find(record.id, (savedBill)=>{
        expect(savedBill.id).toBeDefined();
        expect(savedBill.charges.length).toEqual(1);
        if (savedBill.charges.length) {
          let charge = savedBill.charges[0];
          expect(charge.bill).toBeDefined();
          expect(charge.bill.id).toBeDefined();
          expect(charge.billId).toEqual(savedBill.id);
          expect(charge.id).toBeDefined();
          expect(charge.price).toEqual(2.6);
        }
        expect(savedBill.modifier).toBeDefined();
        expect(savedBill.modifier.id).toBeDefined();
        expect(savedBill.modifier.bill).toBeDefined();
        expect(savedBill.modifier.bill.id).toEqual(savedBill.id);
        expect(savedBill.modifier.fixedValue).toEqual(-1.6);
        expect(savedBill.modifier.charge).toBeUndefined();
        expect(savedBill.toJson()).toEqual(bill.toJson());
        done();
      });
    });
  });

  it('bill with charge and charge modifier', (done)=> {
    let bill = Billing.bills.new();
    let charge = bill.charges.new({ price: 2.6 });
    bill.modifiers.new({ charge: charge, fixedValue: -0.6 });
    expect(bill.charges.length).toEqual(1);
    expect(charge.modifier.fixedValue).toEqual(-0.6);
    bill.save((record)=> {
      expect(record.id).toBeDefined();
      BillingBill.find(record.id, (savedBill)=>{
        expect(savedBill.id).toBeDefined();
        expect(savedBill.charges.length).toEqual(1);
        expect(savedBill.modifier).toBeUndefined();
        if (savedBill.charges.length) {
          let charge = savedBill.charges[0];
          expect(charge.bill).toBeDefined();
          expect(charge.bill.id).toBeDefined();
          expect(charge.billId).toEqual(savedBill.id);
          expect(charge.id).toBeDefined();
          expect(charge.price).toEqual(2.6);
          let modifier = charge.modifier;
          expect(modifier).toBeDefined();
          expect(modifier.id).toBeDefined();
          expect(modifier.bill).toBeDefined();
          expect(modifier.bill.id).toEqual(savedBill.id);
          expect(modifier.fixedValue).toEqual(-0.6);
          expect(modifier.charge).toEqual(charge);
        }
        expect(savedBill.toJson()).toEqual(bill.toJson());
        done();
      });
    });
  });

  it('bill with charge and global and charge modifier', (done)=> {
    let bill = Billing.bills.new();
    let charge = bill.charges.new({ price: 4.6 });
    bill.modifiers.new({ charge: charge, fixedValue: -3.6 });
    bill.modifiers.new({ percentRatio: 0.2 });
    expect(bill.charges.length).toEqual(1);
    expect(charge.modifier.fixedValue).toEqual(-3.6);
    bill.save((record)=> {
      expect(record.id).toBeDefined();
      BillingBill.find(record.id, (savedBill)=>{
        expect(savedBill.id).toBeDefined();
        expect(savedBill.charges.length).toEqual(1);
        expect(savedBill.modifier).toBeDefined();
        expect(savedBill.modifier.percentRatio).toEqual(0.2);
        expect(savedBill.modifiers.length).toEqual(2);
        if (savedBill.charges.length) {
          let charge = savedBill.charges[0];
          expect(charge.bill).toBeDefined();
          expect(charge.bill.id).toBeDefined();
          expect(charge.billId).toEqual(savedBill.id);
          expect(charge.id).toBeDefined();
          expect(charge.price).toEqual(4.6);
          let modifier = charge.modifier;
          expect(modifier).toBeDefined();
          expect(modifier.id).toBeDefined();
          expect(modifier.bill).toBeDefined();
          expect(modifier.bill.id).toEqual(savedBill.id);
          expect(modifier.fixedValue).toEqual(-3.6);
          expect(modifier.charge).toEqual(charge);
        }
        expect(savedBill.toJson()).toEqual(bill.toJson());
        done();
      });
    });
  });

  it('bill with multiple charges', (done)=> {
    let bill = Billing.bills.new();
    bill.charges.new({ price: 1.5 });
    bill.charges.new({ price: 4.5 });
    expect(bill.charges.length).toEqual(2);
    bill.save((record)=> {
      expect(record.id).toBeDefined();
      BillingBill.find(record.id, (savedBill)=>{
        expect(savedBill.id).toBeDefined();
        expect(savedBill.charges.length).toEqual(2);
        expect(savedBill.toJson()).toEqual(bill.toJson());
        done();
      });
    });
  });

  it('bill with payment', (done)=> {
    let bill = Billing.bills.new();
    bill.charges.new({ price: 1.5 });
    bill.charges.new({ price: 4.5 });
    bill.payments.new();
    bill.save((record)=>{
      BillingBill.find(record.id, (savedBill)=>{
        expect(savedBill.charges.length).toEqual(2);
        expect(savedBill.payments.length).toEqual(1);
        if (savedBill.payments.length) {
          let payment = savedBill.payments[0];
          expect(payment.value).toEqual(6);
        }
        done();
      });
    });
  });

  it('bill complex', (done)=> {
    let bill = Billing.bills.new();
    bill.charges.new({ price: 1.5 });
    bill.charges.new({ price: 4.5, modifier: { fixedValue: 1 } });
    bill.payments.new({ value: 3 });
    bill.modifiers.new({ percentRatio: -0.1 });
    bill.payments.new();
    bill.save((record)=>{
      BillingBill.find(record.id, (savedBill)=>{
        expect(savedBill.charges.length).toEqual(2);
        expect(savedBill.payments.length).toEqual(2);
        expect(savedBill.modifiers.length).toEqual(2);
        done();
      });
    });
  });

  it('update bill items', (done)=> {
    let bill = Billing.bills.new();
    bill.charges.new({ price: 1.5 });
    bill.charges.new({ price: 4.5, modifier: { percentRatio: 0.2 } });
    bill.modifiers.new({ percentRatio: -0.1 });
    bill.payments.new();
    bill.save(()=>{ // test orig bill
      expect(bill.id).toBeDefined();
      expect(bill.charges.length).toEqual(2);
      expect(bill.modifiers.length).toEqual(2);
      expect(bill.payments.length).toEqual(1);
      if (bill.charges.length === 2 && bill.modifiers.length === 2 && bill.payments.length == 1) {
        bill.charges[0].update({ price: 1.6 });
        bill.charges[0].save((charge)=> {
          expect(charge.id).toEqual(bill.charges[0].id);
          expect(bill.charges.length).toEqual(2);
          expect(bill.charges[0]['price']).toEqual(1.6);   
          bill.charges[1].update({ price: 4.6 });
          bill.charges[1].save((charge)=> {
            expect(charge.id).toEqual(bill.charges[1].id);
            expect(bill.charges.length).toEqual(2);
            expect(bill.charges[1]['price']).toEqual(4.6);

            bill.modifier.update({ fixedValue: 5 });
            bill.save((updatedBill)=>{
              expect(updatedBill.id).toEqual(bill.id);
              expect(updatedBill.charges.length).toEqual(2);
              expect(updatedBill.modifiers.length).toEqual(2);
              expect(updatedBill.payments.length).toEqual(1);
              done();
            });
          });
        });
      }
    });
  });
});