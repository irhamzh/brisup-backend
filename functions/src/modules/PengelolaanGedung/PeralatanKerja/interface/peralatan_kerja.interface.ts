interface IBasePGPeralatanKerja {
  typePeralatanKerja: string;
  tanggal: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TypePeralatanKerja {
  machinery = 'machinery',
  'equipment consumable' = 'equipment consumable',
  chemical = 'chemical',
  'peralatan teknis' = 'peralatan teknis',
}

interface IPekerjaan extends IBasePGPeralatanKerja {
  pekerjaan: string;
}

interface IInformation extends IBasePGPeralatanKerja {
  information: string;
}

export interface IPeralatanTeknis extends IPekerjaan {
  pelindungKepala?: string;
  pelindungMata?: string;
  pelindungPernafasan?: string;
  pelindungBadan?: string;
  pelindungKaki?: string;
}

export interface IMachinery extends IInformation {
  lowSpeedPolisherMachine?: string;
  wetDryVacuumCleaner?: string;
  jetSprayer?: string;
  blower?: string;
  signed?: string;
}

export interface IEquipmentConsumable extends IInformation {
  doubleBucket?: string;
  singleBucket?: string;
  lobbyDusterStick?: string;
  mopSet?: string;
  windowSqueeze?: string;
  windowWasher?: string;
  teleskopicPool?: string;
  floorSqueeze?: string;
  ember?: string;
  gayung?: string;
  tanggaAlumunium?: string;
}

export interface IChemical extends IInformation {
  floorKlin?: string;
  glassCleaner?: string;
  allPurposeCleaner?: string;
  metalPolish?: string;
  handSoap?: string;
  furniturePolish?: string;
  vim?: string;
  bubukDetergen?: string;
  thiner?: string;
  bayFresh?: string;
  fresPhone?: string;
  marblePowder?: string;
  karbolWangi?: string;
}
