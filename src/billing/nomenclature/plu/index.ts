// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { IPlu } from './interface';
import { IStore } from '../../storable/interface';
import { Storable } from '../../storable';
import { TaxGroup, Department } from '../index'; 

export class Plu extends Storable {
  id :number;
  code ?:string;
  description :string;
  departmentId :number;
  price :number = 0;

  private _name :string;
  get name() {
    if (this._name) return this._name;
    else if (this.department) return this.department.name;
  }
  set name(name :string) {
    this._name = name;
  }

  get taxRatio() :number {
    if (this.taxGroup) return this.taxGroup.percentRatio;
  }

  get taxGroup() :TaxGroup {
    if (this.department) return this.department.taxGroup;
  }

  get department() :Department {
    if (this.departmentId) return Department.find(this.departmentId);
  }

  constructor(attributes :IPlu) {
    super(attributes);
    if (attributes.id) this.id = attributes.id;
    if (attributes.name) this.name = attributes.name;
    if (attributes.description) this.description = attributes.description;
    if (attributes.code) this.code = attributes.code;
    if (attributes.departmentId) this.departmentId = attributes.departmentId;
    if (attributes.price) this.price = attributes.price;
  }
}