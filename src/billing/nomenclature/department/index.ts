// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { Storable } from '../../storable';
import { IDepartment } from './interface';
import { TaxGroup } from '../index';

export class Department extends Storable {
  id :number;
  code ?:string;
  name :string;
  taxGroupId: number;

  get taxRatio() :number {
    if (this.taxGroup) return this.taxGroup.percentRatio;
  }

  get taxGroup() :TaxGroup {
    let _taxGroup :TaxGroup
    if (this.taxGroupId) TaxGroup.find(this.taxGroupId, (taxGroup)=> {
      _taxGroup = taxGroup;
    }).catch((err)=> {
      console.warn(`Plu#taxGroup ${this.taxGroupId} ${err.message}`);
    });
    return _taxGroup;
  }

  constructor(attributes :IDepartment) {
    super(attributes);
    if (attributes.id) this.id = attributes.id;
    if (attributes.name) this.name = attributes.name;
    if (attributes.code) this.code = attributes.code;
    if (attributes.taxGroupId) this.taxGroupId = attributes.taxGroupId;
  }
}