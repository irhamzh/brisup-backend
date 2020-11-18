import { IPartnerBase } from '@modules/Partner/interface/partner.interface';

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
  toilet?: string;
  musholla?: string;
  lobbyLounge?: string;
  ruangMeeting?: string;
  ruangKelas?: string;
  ruangKerja?: string;
  corridor?: string;
  tanggaDarurat?: string;
  ruangSampah?: string;
  ruangShaft?: string;
  parkirMotor?: string;
  halaman?: string;
}

export interface IVendorPengangkutanSampah extends IVendorPartner {
  pengangkutanSampah?: string;
}

//kalao mau fleksibel pindah ke arraay aja
export interface IVendorPewangiRuangan extends IVendorPartner {
  pewangiRuanganL1?: string;
  pewangiRuanganL2?: string;
  pewangiRuanganL3?: string;
  pewangiRuanganL4?: string;
  pewangiRuanganL5?: string;
  pewangiRuanganL6?: string;
}

//kalao mau fleksibel pindah ke arraay aja
export interface IVendorTanamanHias extends IVendorPartner {
  tanamanHiasL1?: string;
  tanamanHiasL2?: string;
  tanamanHiasL3?: string;
  tanamanHiasL4?: string;
  tanamanHiasL5?: string;
  tanamanHiasL6?: string;
}

export interface IVendorLift extends IVendorBase {
  lift: string;
  cleaningAreaSangkarL1?: string;
  cleaningAreaSangkarL2?: string;
  cleaningAreaSangkarL3?: string;
  cleaningAreaSangkarL4?: string;
  cleaningAreaSangkarL5?: string;
  cleaningAreaSangkarL6?: string;
  oliRelSangkarLift?: string;
  taliSelingLift?: string;
  pengeremanLift?: string;
  exhaustFanLift?: string;
  mesinMotorLift?: string;
  powerListrikLift?: string;
}

export interface IVendorGondola extends IVendorBase {
  information: string;
  sistemKerjaTaliBaja?: string;
  panelKelistrikan?: string;
  perangkatKerjaGondola?: string;
}
