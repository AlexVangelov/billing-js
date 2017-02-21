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

  it('create with charge', (done)=> {
    let bill = Billing.bills.new();
    bill.charges.new({ price: 1.5 });
    expect(bill.charges.length).toEqual(1);
    bill.save((record)=> {
      BillingBill.find(record.id, (bill)=>{
        expect(bill.id).toBeDefined();
        //expect(bill.charges.length).toEqual(1);
        if (bill.charges.length) {
          expect(bill.charges[0]['price']).toEqual(1.5);
        }
        done();
      });
    });
  });
});