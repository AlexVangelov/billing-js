import { Storable } from '../../storable';
import { IDepartment } from './interface';
import { TaxGroup } from '../index';

export class Department extends Storable {
  id :number;
  code :string;
  name :string = '';
  taxGroupId: number;

  get taxRatio() :number {
    if (this.taxGroup) return this.taxGroup.percentRatio;
  }

  get taxGroup() :TaxGroup {
    if (this.taxGroupId) return <TaxGroup>TaxGroup.find(this.taxGroupId);
  }

  constructor(attributes :IDepartment) {
    super(attributes);
    if (attributes.id) this.id = attributes.id;
    if (attributes.name) this.name = attributes.name;
    if (attributes.code) this.code = attributes.code;
    if (attributes.taxGroupId) this.taxGroupId = attributes.taxGroupId;
  }
}