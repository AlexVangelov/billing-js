// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { ITaxGroup } from './interface';
import { IStore } from '../../store/interface';
import { Store } from '../../store';

export class TaxGroup extends Store {
  id :number;
  code :string;
  name :string = '';
  percentRatio :number;

  constructor(attributes :ITaxGroup) {
    super(attributes);
    if (attributes.id) this.id = attributes.id;
    if (attributes.name) this.name = attributes.name;
    if (attributes.code) this.code = attributes.code;
    if (attributes.percentRatio) this.percentRatio = attributes.percentRatio;
  }
}