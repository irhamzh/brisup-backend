import { IPartnerBase } from '@modules/MasterData/Partner/interface/partner.interface';

export enum TypeMonitoring {
  'Pest Control' = 'Pest Control',
  'Pengangkutan Sampah' = 'Pengangkutan Sampah',
  'Pewangi Ruangan' = 'Pewangi Ruangan',
  'Tanaman Hias' = 'Tanaman Hias',
  'Lift' = 'Lift',
  'Gondola' = 'Gondola',
}
interface IVendorBase {
  tanggal: Date;
  typeMonitoring: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IVendorPartner extends IVendorBase {
  partner: IPartnerBase;
}

export interface IVendorPestControl extends IVendorPartner {
  toilet?: boolean;
  musholla?: boolean;
  lobbyLounge?: boolean;
  ruangMeeting?: boolean;
  ruangKelas?: boolean;
  ruangKerja?: boolean;
  corridor?: boolean;
  tanggaDarurat?: boolean;
  ruangSampah?: boolean;
  ruangShaft?: boolean;
  parkirMotor?: boolean;
  halaman?: boolean;
}

export interface IVendorPengangkutanSampah extends IVendorPartner {
  pengangkutanSampah?: boolean;
}

//kalao mau fleksibel pindah ke arraay aja
export interface IVendorPewangiRuangan extends IVendorPartner {
  pewangiRuanganL1?: boolean;
  pewangiRuanganL2?: boolean;
  pewangiRuanganL3?: boolean;
  pewangiRuanganL4?: boolean;
  pewangiRuanganL5?: boolean;
  pewangiRuanganL6?: boolean;
}

//kalao mau fleksibel pindah ke arraay aja
export interface IVendorTanamanHias extends IVendorPartner {
  tanamanHiasL1?: boolean;
  tanamanHiasL2?: boolean;
  tanamanHiasL3?: boolean;
  tanamanHiasL4?: boolean;
  tanamanHiasL5?: boolean;
  tanamanHiasL6?: boolean;
}

export interface IVendorLift extends IVendorBase {
  lift: string;
  cleaningAreaSangkarL1?: boolean;
  cleaningAreaSangkarL2?: boolean;
  cleaningAreaSangkarL3?: boolean;
  cleaningAreaSangkarL4?: boolean;
  cleaningAreaSangkarL5?: boolean;
  cleaningAreaSangkarL6?: boolean;
  oliRelSangkarLift?: boolean;
  taliSelingLift?: boolean;
  pengeremanLift?: boolean;
  exhaustFanLift?: boolean;
  mesinMotorLift?: boolean;
  powerListrikLift?: boolean;
}

export interface IVendorGondola extends IVendorBase {
  information: string;
  sistemKerjaTaliBaja?: boolean;
  panelKelistrikan?: boolean;
  perangkatKerjaGondola?: boolean;
}
