export interface IPartnerBase {
  name: string;
  address: string;
  contact: string;
  specialization: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const Specialization = [
  'Lift',
  'Gondola',
  'AHU System',
  'Pest Control',
  'Tanaman Hias',
  'Genset System',
  'Alat Elektrikal',
  'Pewangi Ruangan',
  'Pengangkutan Sampah',
];
