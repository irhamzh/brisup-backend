import BaseRepository from '@repositories/baseRepository';

import { IMonitoringCCTVBase } from './interface/monitoring_cctv.interface';

export default class MonitoringCCTVRepository extends BaseRepository<
  IMonitoringCCTVBase
> {
  constructor() {
    super('ga_monitoring_cctvs', 'ga_monitoring_cctv');
  }
}
