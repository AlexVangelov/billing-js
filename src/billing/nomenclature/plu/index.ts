import { IPlu } from './interface';
import { IStore } from '../../store/interface';
import { Store } from '../../store';

export class Plu extends Store {
  constructor(attributes :IPlu) {
    super();
  }
}