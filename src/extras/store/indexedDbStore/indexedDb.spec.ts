import { Store } from './index';

describe('IndexedDbStore', ()=> {
  let store: Store;
  let collectionName = 'Bill';

  beforeAll((done)=>{
    store = new Store('items');
    store.reset(()=> {
      done();
    });
  });

  it('init', function(done) {
    expect(()=> { store.reset(); }).not.toThrow();
    store.initCollection(collectionName, null, (err, db)=> {
      expect(err).toBeNull();
      done();
    });
  });

  it('findById', function(done) {
    store.findById(collectionName, 1, (err)=> {
      expect(err.message).toEqual('Not Found');
      done();
    });
  });

  it('save (create)', (done)=> {
    store.save(collectionName, {}, (err, record)=> {
      expect(record.id).toBeDefined();
      done();
    });
  });

  it('save (update)', (done)=> {
    store.save(collectionName, { name: "Test" }, (err, record)=> {
      store.save(collectionName, { id: record.id, name: "Test Update"}, (err, updatedRecord)=> {
        expect(updatedRecord.name).toEqual("Test Update");
        done();
      });
    });
  });
});