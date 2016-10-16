import { IOperator } from './interface';
import { Storable } from '../../storable';

export class Operator extends Storable {
  id :number;
  code ?:string;
  name :string = '';

  constructor(attributes :IOperator) {
    super(attributes);
    if (attributes.id) this.id = attributes.id;
    if (attributes.name) this.name = attributes.name;
    if (attributes.code) this.code = attributes.code;
  }
}