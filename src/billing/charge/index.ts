// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { BillItem } from '../concerns/billItem';
import { Modifier } from '../modifier';
import { IChargeAttributes } from './interface';
import { IModifierAttributes } from '../modifier/interface';
import { ChargesCollection } from './collection';

import { Plu, TaxGroup, Department } from '../nomenclature';

export declare type ModifierOrAttributes = Modifier | IModifierAttributes;

/**
 * 
 * 
 * @export
 * @class Charge
 * @extends {BillItem}
 */
export class Charge extends BillItem {

  private _modifier :Modifier;

  private _name :string;

  get name() :string {
    let name :string;
    if (this._name) name = this._name;
    if (!name) if (this.plu) name = this.plu.name;
    if (!name) if (this.department) name = this.department.name;
    return name || '';
  }
  set name(value :string) {
    this._name = value;
  }

  private _description :string;
  get description() :string {
    return this._description ? this._description : (this.plu ? this.plu.description : '');
  }
  set description(value :string) {
    this._description = value;
  }

  private _price :number;
  get price() :number {
    return this._price ? this._price : (this.plu ? this.plu.price : 0);
  }
  set price(value :number) {
    this._price = value;
  }

  private _taxRatio :number;
  get taxRatio() :number {
    let taxRercentRatio :number;
    if (this._taxRatio) taxRercentRatio = this._taxRatio;
    if (!taxRercentRatio)
      if (this.taxGroup) taxRercentRatio = this.taxGroup.percentRatio;
    if (!taxRercentRatio)
      if (this.department) taxRercentRatio = this.department.taxRatio;
    if (!taxRercentRatio)
      if (this.plu) taxRercentRatio = this.plu.taxRatio
    return taxRercentRatio || 0;
  }

  qty :number = 1;

  pluId :number;

  taxGroupId :number;

  departmentId :number;

  /**
   * Creates an instance of Charge.
   * 
   * @param {IChargeAttributes} [attributes={}]
   * 
   * @memberOf Charge
   */
  constructor(attributes: IChargeAttributes = {}) {
    super(attributes);
    this.update(attributes);
  }

  get modifier() :Modifier {
    return this._modifier;
  }
  set modifier(modifier :Modifier) {
    let modifierBill = modifier.bill;
    if (modifierBill) {
      if (!this.bill) this._bill = modifierBill;
      else if (this.bill !== modifierBill) throw new ReferenceError('Charge with modifier belonging to another bill.');
    } else modifier.update({ bill: this.bill });
    if (modifier.charge !== this) {
      if (modifier.charge) modifier.charge.deleteModifier();
      modifier.charge = this;
    }
    this._modifier = modifier;
    if (this.bill && !~this.bill.charges.indexOf(this)) this.bill.charges.add(this);
  }

  get value() :number {
    return (this.qty * this.price);
  }

  get finalValue() :number {
    return this.modifier ? this.value + this.modifier.value : this.value;
  }

  /**
   * 
   * 
   * @param {IModifierAttributes} [attributes={}]
   * @returns {Modifier}
   */
  modify(modifierOrAttributes: ModifierOrAttributes = {}) :Modifier {
    if (modifierOrAttributes instanceof Modifier) {
      this._modifier = modifierOrAttributes;
    } else {
      let attributes = <IModifierAttributes> modifierOrAttributes;
      attributes.charge = this;
      if (attributes.bill) {
        if (!this.bill) this._bill = attributes.bill;
        else if (attributes.bill !== this.bill) throw new ReferenceError('Charge with modifier belonging to another bill.');
      } else attributes.bill = this.bill;
      if (this.modifier) this.bill.modifiers.remove(this.modifier);
      this._modifier = new Modifier(attributes);
      if (this.bill) {
        this.bill.modifiers.add(this.modifier);
        this.bill.charges.add(this);
      }
    }
    return this.modifier;
  }

  deleteModifier() :boolean {
    // ? delete modifier
    delete this._modifier;
    return true;
  };

  delete():Boolean {
    if (this.bill) this.bill.charges.remove(this);
    return true; //delete this;
  }

  update(attributes: IChargeAttributes = {}) :boolean {
    if (attributes.bill) this._bill = attributes.bill;
    if (typeof attributes.name !== 'undefined') this.name = attributes.name;
    if (typeof attributes.description !== 'undefined') this._description = attributes.description;
    if (typeof attributes.price !== 'undefined') this._price = attributes.price;
    if (typeof attributes.qty !== 'undefined') this.qty = attributes.qty;
    if (attributes.plu) this.plu = attributes.plu;
    if (attributes.pluId) this.pluId = attributes.pluId;
    if (attributes.taxGroup) this.taxGroup = attributes.taxGroup;
    if (attributes.taxGroupId) this.taxGroupId = attributes.taxGroupId;
    if (attributes.taxRatio) this._taxRatio = attributes.taxRatio;
    if (attributes.department) this.department = attributes.department;
    if (attributes.departmentId) this.departmentId = attributes.departmentId;
    if (attributes.modifier) {
      if (attributes.modifier instanceof Modifier) {
        this.modifier = attributes.modifier; 
      } else {
        if (attributes.modifier.bill) {
        if (!this.bill) this._bill = attributes.modifier.bill;
          else if (this.bill !== attributes.modifier.bill) throw new ReferenceError('Charge with modifier belonging to another bill.');
        } else attributes.modifier.bill = this.bill;
        attributes.modifier.charge = this;
        this._modifier = new Modifier(attributes.modifier);
        if (this.bill && !~this.bill.charges.indexOf(this)) this.bill.charges.add(this);
      }
    }
    if (this.bill && !~this.bill.charges.indexOf(this)) this.bill.charges.add(this);
    return true;
  }

  toJson(useNomenclatureIds = false, deep = true) :any {
    if (this.isValid) {
      let json = this.jsonBase({ 
        qty: this.qty,
        price: this.price,
        name: this.name
      });
      if (this.description) json['description'] = this.description;
      if (deep && this.modifier) json['modifier'] = this.modifier.toJson();
      if (this.taxRatio) json['taxRatio'] = this.taxRatio;
      if (useNomenclatureIds) {
        if (this.pluId) json['pluId'] = this.pluId;
        if (this.departmentId) json['departmentId'] = this.departmentId;
        if (this.taxGroupId) json['taxGroupId'] = this.taxGroupId;
      }
      return json;
    }
  }

  get plu() :Plu {
    let _plu :Plu;
    if (this.pluId) Plu.find(this.pluId, (plu)=> {
      _plu = plu;
    }).catch((err)=> {
      console.warn(`Charge#plu ${this.pluId} ${err.message}`);
    });
    return _plu;
  }
  set plu(plu :Plu) {
    this.pluId = plu.id;
  }

  get taxGroup() {
    let _taxGroup :TaxGroup;
    if (this.taxGroupId) TaxGroup.find(this.taxGroupId, (taxGroup)=> {
      _taxGroup = taxGroup;
    }).catch((err)=> {
      console.warn(`Charge#taxGroup ${this.taxGroupId} ${err.message}`);
    });
    return _taxGroup;
  }
  set taxGroup(taxGroup :TaxGroup) {
    this.taxGroupId = taxGroup.id;
  }

  get department() {
    let _department :Department;
    if (this.departmentId) Department.find(this.departmentId, (department)=> {
      _department = department;
    }).catch((err)=> {
      console.warn(`Charge#department ${this.departmentId} ${err.message}`);
    });
    return _department;
  }
  set department(department :Department) {
    this.departmentId = department.id;
  }
}

Charge.validates('bill', { presence: true });
Charge.validates('price', { greaterThan: 0 });
Charge.validates('qty', { greaterThan: 0 });
Charge.validates('finalValue', { greaterThanOrEqualTo: 0 });
Charge.validates('modifier', { invalid: (self)=> {
  return self.modifier && !self.modifier.isValid;
}});

export { ChargesCollection };