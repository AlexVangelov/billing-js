import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { WidgetCharge } from './charge';
import { WidgetModifier } from './modifier';
import { WidgetPayment } from './payment';

declare var billingJs: any;

@Component({
  selector: 'widget-billing',
  templateUrl: 'src/widget/billing.html'
})
export class WidgetBilling {
  selectedItem :any;
  selectedCollection :any;
  bill :any;
  dialogType :any;
  
  constructor() {
    this.bill = billingJs.Billing.bills.new();
    
    this.bill = billingJs.Billing.bills.new();
    this.bill.charges.new({ price: 8.3, name: 'Umbrella', description: 'Unmatched quality and classic design' });
    this.bill.charges.new({ price: 135, name: 'Briefcase', description: 'High-quality ballistic nylon fabric',
      modifier: { percentRatio: -0.1 } });
    this.bill.charges.new({ qty: 3, price: .65, description: 'Accessories' });
    this.bill.payments.new({ name: 'Cash' });
  }
  
  private buildCollectionItem() :any {
    let item = this.selectedCollection.new();
    item.state = true; //state is for UI purposes (not used in billing)
    return item;
  }
  
  editCharge(charge ?:any) {
    this.selectedCollection = this.bill.charges;
    this.selectedItem = charge || this.buildCollectionItem();
    this.dialogType = 'charge';
  }
  editModifier(modifier ?:any) {
    this.selectedCollection = this.bill.modifiers;
    this.selectedItem = modifier || this.buildCollectionItem();
    this.dialogType = 'modifier';
  }
  editPayment(payment ?:any) {
    this.selectedCollection = this.bill.payments;
    this.selectedItem = payment || this.buildCollectionItem();
    this.dialogType = 'payment';
  }
  
  done(modified :boolean) {
    if (!modified && this.selectedItem.state) this.selectedItem.delete();
    delete this.selectedItem.state;
    delete this.selectedItem;
    delete this.dialogType;
    if (modified) this.bill.isValid;
  }
  
  isSelected(item) {
    return item === this.selectedItem;
  }
  
  labelForModifier(modifier :any) {
    let r = modifier.percentRatio;
    let s = r > 0 ? '+' : ''; 
    let label = r ? s + (r * 100) + '%' : '';
    return `${label} ${modifier.value > 0 ? 'Surcharge' : 'Discount'}`;
  }
  
  showJson() {
    this.selectedItem = this.bill;
    this.dialogType = 'json';
  }
  
  reset() {
    this.bill = billingJs.Billing.bills.new();
  }
  
  get globalModifiers() {
    return this.bill.modifiers.filter( mod => {
      return !mod.charge;
    });
  }
}

@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule ],
  declarations: [ 
    WidgetBilling, 
    WidgetCharge, 
    WidgetModifier, 
    WidgetPayment 
  ],
  bootstrap: [ WidgetBilling ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WidgetBillingModule {}