export interface IMonitoringCCTVBase {
  tanggal: Date;
  cctvOutdoor: boolean;
  innovationBuilding: boolean;
  smartBuilding: boolean;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}
