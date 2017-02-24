import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'widget-charge',
  templateUrl: 'src/widget/chargeForm.html'
})
export class WidgetCharge {
  @Input() charge: any;
  @Output() done = new EventEmitter();
  
  origCharge :any;
  chargeForm :FormGroup;
  origModifier :any;
  modifierForm :FormGroup;
  errorMsg :string;
  
  constructor(private fb: FormBuilder) {};
  
  ngOnInit() {
    this.origCharge = {
      qty: this.charge.qty,
      price: this.charge.price || null,
      name: this.charge.name,
      description: this.charge.description
    };
    this.chargeForm = this.fb.group(this.origCharge);

    if (this.charge.modifier) {
      this.origModifier = {
        modifierKind: 'fixed',
        fixedValue: this.charge.modifier.fixedValue,
        percent: null
      };
      if (this.charge.modifier.percentRatio) {
        this.origModifier.percent = this.charge.modifier.percentRatio * 100;
        this.origModifier.modifierKind = 'percent'
      }
      this.modifierForm = this.fb.group(this.origModifier);
    }
  }
  
  destroy() {
    this.charge.delete();
    this.done.emit(true);
  }
  
  onSubmit(ev :any) {
    ev.preventDefault();
    this.charge.update(this.chargeForm.value);
    // if (this.charge.isValid) this.done.emit(true);
    // else {
    //   this.errorMsg = this.charge.errors.messages.join(', ');
    //   this.charge.update(this.origCharge); //TODO provide rollback mechanism
    // }
    let success =  this.charge.save(()=> {
      this.done.emit(true);
    });
    if (!success) {
      this.errorMsg = this.charge.errors.messages.join(', ');
      this.charge.update(this.origCharge); //TODO provide rollback mechanism
    }
  }

  addModifier() {
    this.modifierForm = this.fb.group({
      modifierKind: 'percent',
      fixedValue: null,
      percent: null
    });
  }

  removeModifier() {
    delete this.modifierForm;
  }
  
  cancel() {
    this.done.emit(false);
  }
}