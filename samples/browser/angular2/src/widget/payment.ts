import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'widget-payment',
  templateUrl: 'src/widget/paymentForm.html'
})
export class WidgetPayment {
  @Input() payment: any;
  @Output() done = new EventEmitter();
  
  origPayment :any;
  paymentForm :FormGroup;
  errorMsg :string;
  
  constructor(private fb: FormBuilder) {};
  
  ngOnInit() {
    this.origPayment = {
      name: this.payment.name,
      value: this.payment.value || null,
      isCash: this.payment.isCash
    };
    this.paymentForm = this.fb.group(this.origPayment);
  }
  
  destroy() {
    this.payment.delete();
    this.done.emit(true);
  }
  
  onSubmit(ev :any) {
    ev.preventDefault();
    this.payment.update(this.paymentForm.value);
    if (this.payment.isValid) this.done.emit(true);
    else {
      this.errorMsg = this.payment.errors.messages.join(', ');
      this.payment.update(this.origPayment);
    }
    return true;
  }
  
  cancel() {
    this.done.emit(false);
  }
}