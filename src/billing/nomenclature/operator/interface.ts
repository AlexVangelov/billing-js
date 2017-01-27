// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IStoreRecord, IStoreConfig } from '../../storable/interface';

export declare type TOperatorsConfig = Array<IOperator> | IStoreConfig;

export interface IOperator extends IStoreRecord {
  id :number;
  code ?:string;
  name :string;
}