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

//????
interface IPekerjaan extends IBasePGPeralatanKerja {
  pekerjaan: string;
}

interface IInformation extends IBasePGPeralatanKerja {
  information: string;
}

export interface IPeralatanTeknis extends IPekerjaan {
  pelindungKepala?: boolean;
  pelindungMata?: boolean;
  pelindungTangan?: boolean;
  pelindungPernafasan?: boolean;
  pelindungBadan?: boolean;
  pelindungKaki?: boolean;
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
  floorKlin?: boolean;
  glassCleaner?: boolean;
  allPurposeCleaner?: boolean;
  metalPolish?: boolean;
  handSoap?: boolean;
  furniturePolish?: boolean;
  vim?: boolean;
  bubukDetergen?: boolean;
  thiner?: boolean;
  bayFresh?: boolean;
  fresPhone?: boolean;
  marblePowder?: boolean;
  karbolWangi?: boolean;
}
