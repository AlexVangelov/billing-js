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