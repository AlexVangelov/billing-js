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

  it('find', (done)=> {
    store.save("Charge", mockModel({ billId: 99, name: "Test1" }), (err, record)=> {
      expect(err).toBeNull();
      store.save("Charge", mockModel({ billId: 99, name: "Test2" }), (err, record)=> {
        store.find("Charge", { billId: 99 }, null, (err, records)=> {
          expect(err).toBeNull();
          expect(records).toBeDefined();
          expect(records.length).toEqual(2);
          if (records.length) {
            expect(records[0].name).toEqual('Test1');
            expect(records[1].name).toEqual('Test2');
          }
          done();
        });
      });
    });
  });

  it('findOne', (done)=> {
    store.save("Charge", mockModel({ billId: 99, name: "Test1" }), (err, record)=> {
      expect(err).toBeNull();
      store.save("Charge", mockModel({ billId: 99, name: "Test2" }), (err, record)=> {
        store.findOne("Charge", { billId: 99 }, null, (err, record)=> {
          expect(err).toBeNull();
          expect(record.id).toBeDefined();
          expect(record.billId).toEqual(99);
          expect(record.name).toEqual('Test1');
          done();
        });
      });
    });
  });

  it('findOne (multi index)', (done)=> {
    store.save("Modifier", mockModel({ billId: 100, chargeId: 32, fixedValue: 4.5 }), (err, record)=> {
      expect(err).toBeNull();
      store.save("Modifier", mockModel({ billId: 100, name: "Test2" }), (err, record)=> {
        store.findOne("Modifier", { billId: 100, chargeId: 32 }, null, (err, record)=> {
          expect(err).toBeNull();
          expect(record).toBeDefined();
          expect(record.billId).toEqual(100);
          expect(record.chargeId).toEqual(32);
          expect(record.fixedValue).toEqual(4.5);
          done();
        });
      });
    });
  });

});