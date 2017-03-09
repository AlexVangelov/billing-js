import { Store } from './index';

import * as AWS from "aws-sdk/global";
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

describe('IndexedDbStore', ()=> {
  let store: Store;
  let collectionName = 'Bill';

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

  it('findById (existing)', function(done) {
    store.findById(collectionName, 1, (err, data)=> {
      expect(err).toBeNull();
      expect(data).toBeDefined();
      done();
    });
  });

  it('findById (not found)', function(done) {
    store.findById(collectionName, 2, (err, data)=> {
      expect(err.message).toEqual('Not Found');
      done();
    });
  });
});