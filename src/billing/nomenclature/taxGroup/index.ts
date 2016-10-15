// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { ITaxGroup } from './interface';
import { IStore } from '../../storable/interface';
import { Storable } from '../../storable';

export class TaxGroup extends Storable {
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