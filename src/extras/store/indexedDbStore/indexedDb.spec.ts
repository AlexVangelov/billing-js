import { Store } from './index';

describe('IndexedDbStore', ()=> {
  let store: Store;
  let collectionName = 'Bill';
  let mockModel = (record)=> { return { toJson: ()=> { return record; } }; };

  beforeAll((done)=>{
    store = new Store('items');
    store.reset(()=> {
      done();
    });
  });

  it('init', function(done) {
    store.reset((err)=> {
      expect(err).toBeNull();
      store.initCollection(collectionName, null, (err, db)=> {
        expect(err).toBeNull();
        done();
      });
    });
  });

  it('findById', function(done) {
    store.findById(collectionName, 1, (err)=> {
      expect(err.message).toEqual('Not Found');
      done();
    });
  });

  it('save (create)', (done)=> {
    store.save(collectionName, mockModel({}), (err, record)=> {
      expect(record.id).toBeDefined();
      done();
    });
  });

  it('save (update)', (done)=> {
    store.save(collectionName, mockModel({ name: "Test" }), (err, record)=> {
      record.name = "Test Update";
      store.save(collectionName, mockModel({ id: record.id, name: "Test Update"}), (err, updatedRecord)=> {
        expect(updatedRecord.name).toEqual("Test Update");
        done();
      });
    });
  });
});