// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IPlu } from './interface';
import { IStore } from '../../store/interface';
import { Store } from '../../store';

export class Plu extends Store {
  id :number;
  code :string;
  name :string = '';
  departmentId :number;
  price :number = 0;

  constructor(attributes :IPlu) {
    super(attributes);
    if (attributes.id) this.id = attributes.id;
    if (attributes.name) this.name = attributes.name;
    if (attributes.code) this.code = attributes.code;
    if (attributes.departmentId) this.departmentId = attributes.departmentId;
    if (attributes.price) this.price = attributes.price;
  }
}