import { Store } from './index';

describe('IndexedDbStore', ()=> {
  let store: Store;
  beforeAll((done)=>{
    store = new Store('items');
    store.init().then(done);
  });

  it('init', function(done) {
    expect(()=> { store.reset().then(done); }).not.toThrow();
  });

  it('findById', function(done) {
    store.findById(1).then((record)=> {}, (error)=> {
      expect(error.message).toEqual('Not Found');
      done();
    });
  });

  it('save (create)', (done)=> {
    store.save({}).then((record)=> {
      expect(record.id).toBeDefined();
      done();
    });
  });

  it('save (update)', (done)=> {
    store.save({ name: "Test" }).then((record)=> {
      store.save({ id: record.id, name: "Test Update"}).then((updatedRecord)=> {
        expect(updatedRecord.name).toEqual("Test Update");
        done();
      });
    });
  });
});