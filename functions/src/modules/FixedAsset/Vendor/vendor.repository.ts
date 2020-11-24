import BaseRepository from '@repositories/baseRepository';
import {
  IVendorLift,
  IVendorGondola,
  IVendorTanamanHias,
  IVendorPestControl,
  IVendorPewangiRuangan,
  IVendorPengangkutanSampah,
} from '@modules/FixedAsset/Vendor/interface/vendor.interface';

export default class VendorRepository extends BaseRepository<
  | IVendorLift
  | IVendorGondola
  | IVendorTanamanHias
  | IVendorPestControl
  | IVendorPewangiRuangan
  | IVendorPengangkutanSampah
> {
  constructor() {
    super('monitoring-vendors', 'monitoring-vendor');
  }
}
