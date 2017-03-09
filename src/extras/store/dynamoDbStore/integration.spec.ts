import { Billing, BillingBill } from '../../../';
import { Store as DynamoDbStore } from './';

import * as AWS from "aws-sdk/global";
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

describe('DynamoDbStore Integration', ()=> {

  beforeAll((done)=>{
    AWS.config.update(<any>{
      region: "us-east-1",
      endpoint: "http://localhost:8000",
      accessKeyId: "fakeMyKeyId",
      secretAccessKey: "fakeSecretAccessKey"
    });
    let docClient = new DynamoDB.DocumentClient();
    let store = new DynamoDbStore(docClient);
    Billing.config({
      store: store
    }, function(err) {
      if (!err) done();
      else throw err;
    });
  });

  it('find non existing', (done)=>{
    BillingBill.find(2, (bill)=>{}).catch((err: Error)=> {
      expect(err.message).toEqual('Not Found');
      done();
    });
  });

  it('find existing', (done)=>{
    BillingBill.find(1, (bill)=>{
      expect(bill instanceof BillingBill).toBeTruthy();
      done();
    }).catch((err)=> { throw err; });
  });
});