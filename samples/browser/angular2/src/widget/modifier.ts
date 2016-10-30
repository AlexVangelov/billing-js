import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'widget-modifier',
  templateUrl: 'src/widget/modifierForm.html'
})
export class WidgetModifier {
  @Input() modifier: any;
  @Input() charges: Array<any>;
  @Output() done = new EventEmitter();
  
  origModifier :any;
  modifierForm :FormGroup;
  errorMsg :string;
  
  constructor(private fb: FormBuilder) {};
  
  ngOnInit() {
    this.origModifier = {
      modifierKind: 'fixed',
      percent: null,
      fixedValue: this.modifier.fixedValue || null,
      chargeIndex: this.charges.indexOf(this.modifier.charge)
    };
    if (this.modifier.percentRatio) {
      this.origModifier.percent = this.modifier.percentRatio * 100;
      this.origModifier.modifierKind = 'percent';
    }
    this.modifierForm = this.fb.group(this.origModifier);
  }
  
  destroy() {
    this.modifier.delete();
    this.done.emit(true);
  }
  
  onSubmit(ev :any) { 
    let data = {
      charge: this.charges[this.modifierForm.value.chargeIndex] || null,
      percentRatio: this.modifierForm.value.percent ? this.modifierForm.value.percent / 100 : null,
      fixedValue: this.modifierForm.value.fixedValue
    };
    ev.preventDefault();
    if (this.modifierForm.value.modifierKind === 'fixed') data.percentRatio = null;
    else data.fixedValue = null;
    this.modifier.update(data);
    if (this.modifier.isValid) this.done.emit(true);
    else {
      let rollback = {
        fixedValue: this.origModifier.fixedValue,
        percentRatio: null,
        charge: null
      };
      if (this.origModifier.percent) rollback.percentRatio = this.origModifier.percent / 100;
      if (this.origModifier.chargeIndex > -1) rollback.charge = this.charges[this.origModifier.chargeIndex];
      this.errorMsg = this.modifier.errors.messages.join(', ');
      this.modifier.update(rollback);
    }
    return true;
  }
  
  cancel() {
    this.done.emit(false);
  }
}