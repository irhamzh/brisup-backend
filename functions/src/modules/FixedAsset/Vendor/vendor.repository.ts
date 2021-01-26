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
    super(
      'fx_monitoring_vendors',
      'fx_monitoring_vendor',
      'bri_corpu_fx_monitoring_vendors'
    );
  }
}
