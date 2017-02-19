import { Billing, BillingBill } from '../../../';
import { Store as IndexedDbStore } from './';

describe('IndexedDbStore Integration', ()=> {

  beforeAll((done)=>{
    let store = new IndexedDbStore('TestBillingDb');
    Billing.config({
      store: store
    }, (err, db)=> {
      if (!err) {
        store.reset();
        done();
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
    //bill.save((err, record)=>{
      done();
    //});
  });
});