import { ICheckpointBase } from '@modules/MasterData/Checkpoint/interface/checkpoint.interface';

export interface IBasementBase {
  tanggal: Date;
  checkpoint: ICheckpointBase;
  foto: string;
}
