// Copyright (c) 2017 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStore, IStoreRecord } from '../interface';

import * as AWS from 'aws-sdk/global';
import { ConfigurationOptions as AWSConfigurationOptions } from 'aws-sdk/lib/config';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';


export class Store implements IStore {
  private _items :Array<IStoreRecord> = [];
  private docClient :any;

  constructor(options?: AWSConfigurationOptions) {
    AWS.config.update(options || { // default - local DynamoDB
      region: "us-west-2",
      endpoint: 'http://localhost:8000',
      accessKeyId: "fakeMyKeyId",
      secretAccessKey: "fakeSecretAccessKey"
    }, true);

    this.docClient = new DynamoDB.DocumentClient();
    this.docClient.get({
      TableName: 'Movies',
      Key: {
        year: 2015,
        title: 'The Big New Movie'
      }
    }, function(err, data) {
      console.log('db', err, data)  
    });
  }

  initCollection(collectionName: string) {
  }

  findById(id: number, callback: any) {
    for (let i of this._items) {
      if (i.id === id) {
        return callback(undefined, i);
      }
    }
    return callback(new Error('Not Found'));
  }

  findOne(conditions: any, callback: any) {
    if (this._items.length > 0) return callback(undefined, this._items[0]);
    else return callback(new Error('Not Found'));
  }

  find(conditions :any, callback :any) {
    return callback(undefined, this._items);
  }
}
