// Copyright (c) 2017 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStore, IStoreRecord } from '../../../billing/storable/interface';

import * as AWS from 'aws-sdk/global';
import { ConfigurationOptions as AWSConfigurationOptions } from 'aws-sdk/lib/config';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';


export class Store implements IStore {
  private _items :Array<IStoreRecord> = [];
  private docClient :DynamoDB.DocumentClient;

  constructor(options?: AWSConfigurationOptions | DynamoDB.DocumentClient) {
    if (options && /DocumentClient/.test(options.constructor.toString())) {
      this.docClient = <DynamoDB.DocumentClient>options;
    } else {
      AWS.config.update(options || { // default - local DynamoDB
        // region: process.env.AWS_REGION,
        // endpoint: process.env.DYNAMODB_ENDPOINT,//'http://localhost:8000',
        // accessKeyId: process.env.AWS_ACCESS_KEY,
        // secretAccessKey: process.env.AWS_SECRET_KEY
        region: "us-east-1",
        endpoint: 'http://localhost:8000',
        accessKeyId: "fakeMyKeyId",
        secretAccessKey: "fakeSecretAccessKey"
      }, true);

      this.docClient = new DynamoDB.DocumentClient();
    }
  }

  initCollection(collectionName: string, items :Array<IStoreRecord> = [], callback :Function) {
    callback(null, this.docClient);
  }

  findById(collectionName :string, id: number, callback: any) :any {
    this.docClient.get({
      TableName: collectionName,
      Key: {
        id: id
      }
    }, (err, data)=> {
      if (err) callback(err);
      else if (!data.Item) callback(new Error('Not Found'));
      else callback(err, data.Item);
    });
  }

  findOne(collectionName :string, conditions: any, callback: any) {
    if (this._items.length > 0) return callback(undefined, this._items[0]);
    else return callback(new Error('Not Found'));
  }

  find(collectionName :string, conditions :any, callback :any) {
    return callback(undefined, this._items);
  }

  save(collectionName :string, record: any, callback ?:Function) {

  }
}
