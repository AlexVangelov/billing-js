// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

import { BillItem } from '../concerns/billItem';
import { Modifier } from '../modifier';
import { IChargeAttributes } from './interface';
import { IModifierAttributes } from '../modifier/interface';

import { Plu, TaxGroup } from '../nomenclature';

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
    return this._name ? this._name : (this.plu ? this.plu.name : '');
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
    return this._taxRatio ? this._taxRatio : (this.taxGroup ? this.taxGroup.percentRatio : 0);
  }
  set taxRatio(value :number) {
    this._taxRatio = value;
  }

  qty :number = 1;

  pluId :number;

  taxGroupId :number;

  /**
   * Creates an instance of Charge.
   * 
   * @param {IChargeAttributes} [attributes={}]
   * 
   * @memberOf Charge
   */
  constructor(attributes: IChargeAttributes = {}) {
    super(attributes.bill);
    this.update(attributes);
  }

  get modifier() :Modifier {
    return this._modifier;
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
    return delete this;
  }

  update(attributes: IChargeAttributes = {}) :boolean {
    if (attributes.bill) this._bill = attributes.bill;
    if (attributes.name) this.name = attributes.name;
    if (attributes.description) this._description = attributes.description;
    if (attributes.price) this._price = attributes.price;
    if (attributes.qty) this.qty = attributes.qty;
    if (attributes.pluId) this.pluId = attributes.pluId;
    if (attributes.taxGroupId) this.taxGroupId = attributes.taxGroupId;
    if (attributes.taxRatio) this._taxRatio = attributes.taxRatio;
    if (attributes.modifier) {
      if (attributes.modifier instanceof Modifier) {
        let modifier = <Modifier> attributes.modifier;
        let modifierBill = modifier.bill;
        if (modifierBill) {
          if (!this.bill) this._bill = modifierBill;
          else if (this.bill !== modifierBill) throw new ReferenceError('Charge with modifier belonging to another bill.');
        } else modifier.update({ bill: this.bill });
        if (modifier.charge !== this) modifier.charge = this;
        this._modifier = modifier; 
      } else {
        if (attributes.modifier.bill) {
        if (!this.bill) this._bill = attributes.modifier.bill;
          else if (this.bill !== attributes.modifier.bill) throw new ReferenceError('Charge with modifier belonging to another bill.');
        } else attributes.modifier.bill = this.bill;
        attributes.modifier.charge = this;
        this._modifier = new Modifier(attributes.modifier);
      }
      if (this.bill) this.bill.modifiers.add(this.modifier);
    }
    if (this.bill && !~this.bill.charges.indexOf(this)) this.bill.charges.add(this);
    return true;
  }

  toJson() :any {
    if (this.isValid) {
      let json = {
        qty: this.qty,
        price: this.price,
        name: this.name
      }
      if (this.description) json['description'] = this.description;
      if (this.modifier) json['modifier'] = this.modifier.toJson();
      return json;
    }
  }

  get plu() :Plu {
    if (this.pluId) return <Plu>Plu.find(this.pluId);
  }

  get taxGroup() {
    if (this.taxGroupId) return <TaxGroup>TaxGroup.find(this.taxGroupId);
  }
}

Charge.validates('bill', { presence: true });
Charge.validates('price', { greaterThan: 0 });
Charge.validates('finalValue', { greaterThanOrEqualTo: 0 });
Charge.validates('modifier', { invalid: (self)=> {
  return self.modifier && !self.modifier.isValid;
}});

export { ChargesCollection } from './collection';