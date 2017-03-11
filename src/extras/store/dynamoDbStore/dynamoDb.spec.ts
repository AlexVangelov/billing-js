import { Store } from './index';

import * as AWS from "aws-sdk/global";
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

xdescribe('IndexedDbStore', ()=> {
  let store: Store;
  let collectionName = 'Bill';
  let mockModel = (record)=> { return { toJson: ()=> { return record; } }; };

  beforeAll(()=>{
    AWS.config.update(<any>{
      region: "us-east-1",
      endpoint: "http://localhost:8000",
      accessKeyId: "fakeMyKeyId",
      secretAccessKey: "fakeSecretAccessKey"
    });
    let docClient = new DynamoDB.DocumentClient();
    store = new Store(docClient);
  });

  xit('findById (existing)', function(done) {
    store.findById(collectionName, '1', (err, data)=> {
      expect(err).toBeNull();
      expect(data).toBeDefined();
      done();
    });
  });

  it('findById (not found)', function(done) {
    store.findById(collectionName, '2', (err, data)=> {
      expect(err.message).toEqual('Not Found');
      done();
    });
  });

  it('save (create)', (done)=> {
    store.save(collectionName, mockModel({}), (err, record)=> {
      expect(err).toBeNull();
      expect(record.id).toBeDefined();
      store.findById(collectionName, record.id, (err, data)=> {
        expect(err).toBeNull();
        expect(data).toBeDefined();
        done();
      });
    });
  });

  it('save (update)', (done)=> {
    store.save(collectionName, mockModel({ name: "Test" }), (err, record)=> {
      record.name = "Test Update";
      expect(record.id).toBeDefined();
      store.save(collectionName, mockModel({ id: record.id, name: "Test Update"}), (err, updatedRecord)=> {
        expect(updatedRecord.id).toEqual(record.id);
        expect(updatedRecord.name).toEqual("Test Update");
        done();
      });
    });
  });
});