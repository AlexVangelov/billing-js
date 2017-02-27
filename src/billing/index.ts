// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Bills } from './collection';
import { Bill } from './bill';
import { Charge } from './charge';
import { Modifier } from './modifier';
import { Payment } from './payment';

import { INomenclatureAttributes } from './nomenclature/interface';
import * as Nomenclature from './nomenclature';

import { IStore } from './storable/interface';
import { MemoryStore } from './storable/memoryStore';

export interface IBillingConfig {
  nomenclature ?:INomenclatureAttributes;
  store ?:IStore
}

export module Billing {
  export var bills :Bills = new Bills();
  export function config(config: IBillingConfig = {}, callback ?:any) {
    let nomenclatureStore = config.store ? config.store : new MemoryStore();
    if (config.nomenclature) Nomenclature.init(config.nomenclature, nomenclatureStore);
    if (config.store) {
      Bill.initStore(null, config.store, (err)=> {
        if (err && callback) {
          console.error('Bill.initStore', err);
          return callback(err);
        }
        Charge.initStore(null, config.store, (err)=> {
          if (err && callback) {
            console.error('Charge.initStore', err);
            return callback(err);
          }
          Modifier.initStore(null, config.store, (err)=> {
            if (err && callback) {
              console.error('Modifier.initStore', err);
              return callback(err);
            }
            Payment.initStore(null, config.store, callback);
          });
        });
      });
    } else if (callback) callback(); //TODO go parallel
  }
}
