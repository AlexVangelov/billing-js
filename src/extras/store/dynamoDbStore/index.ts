// Copyright (c) 2017 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStore, IStoreRecord } from '../../../billing/storable/interface';

import * as AWS from 'aws-sdk/global';
import { ConfigurationOptions as AWSConfigurationOptions } from 'aws-sdk/lib/config';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import * as uuid from 'uuid/v4';

export class Store implements IStore {
  private _items :Array<IStoreRecord> = [];
  private docClient :DynamoDB.DocumentClient;

  constructor(options?: AWSConfigurationOptions | DynamoDB.DocumentClient) {
    if (options && /DocumentClient/.test(options.constructor.toString())) {
      this.docClient = <DynamoDB.DocumentClient>options;
    } else {
      AWS.config.update(options || { // default - local DynamoDB
        region: process.env.AWS_REGION || "us-east-1",
        endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
        accessKeyId: process.env.AWS_ACCESS_KEY || 'fakeMyKeyId',
        secretAccessKey: process.env.AWS_SECRET_KEY || 'fakeSecretAccessKey'
      }, true);

      this.docClient = new DynamoDB.DocumentClient();
    }
  }

  initCollection(collectionName: string, items :Array<IStoreRecord> = [], callback :Function) {
    if (callback) callback(null, this.docClient);
  }

  findById(collectionName :string, id :string, callback: any) :any {
    this.docClient.get({
      TableName: collectionName,
      Key: {
        id: id.toString()
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

  save(collectionName :string, model: any, callback ?:Function) {
    let record = model.toJson(true, false);
    if (!record.id) {
      record.id = uuid();
      record.createdAt = new Date().toISOString();
      this.docClient.put({
        TableName: collectionName,
        Item: record
      }, (err, data)=> {
        callback(err, record);
      });
    } else {

    }
  }
}
