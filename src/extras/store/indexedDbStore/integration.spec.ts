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
        expect(savedBill.modifier).toBeUndefined()
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
});