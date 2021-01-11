import { IApprovalLog } from '@interfaces/BaseInterface';

export interface IPersekotBase {
  date: Date;
  name: string;
  division: string;
  costNominal: number;
  status: string;
  approvalLog: IApprovalLog[];
  information?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPersekotFinancialAdmin extends IPersekotBase {
  typePersekot: string;
}

export const FinancialAdminPersekotType = ['LOP', 'DLK'];
