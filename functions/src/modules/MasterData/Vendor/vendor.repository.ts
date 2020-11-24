import BaseRepository from '@repositories/baseRepository';
import { IVendorBase } from './interface/vendor.interface';

export default class VendorRepository extends BaseRepository<IVendorBase> {
  constructor() {
    super('vendors', 'vendor');
  }
}
