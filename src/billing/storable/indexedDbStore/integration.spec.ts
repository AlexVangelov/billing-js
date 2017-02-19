import { Billing } from '../../';
import { Store as IndexedDbStore } from './';

describe('IndexedDbStore Integration', ()=> {

  beforeAll(()=>{
    Billing.config({
      store: new IndexedDbStore('TestBillingDb')
    });
  });

  it('init', ()=>{

  })
});