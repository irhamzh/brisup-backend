export interface IMonitoringCCTVBase {
  tanggal: Date;
  cctvOutdoor: boolean;
  gedungAlantai1: boolean;
  gedungAlantai2: boolean;
  information: string;
  createdAt?: Date;
  updatedAt?: Date;
}
