interface IApprovalLog {
  date: Date;
  userId: string;
  name: string;
  role: string;
  status: string;
}

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

export enum ApprovalStatus {
  'Unapproved' = 'Unapproved',
  'Approved oleh Supervisor I' = 'Approved oleh Supervisor I',
  'Diajukan Penihilan' = 'Diajukan Penihilan',
  'Approved oleh Supervisor II' = 'Approved oleh Supervisor II',
  'Approved oleh Wakabag' = 'Approved oleh Wakabag',
  'Approved oleh Kabag' = 'Approved oleh Kabag',
}

export enum ApprovalNextStatus {
  'Unapproved' = 'Approved oleh Supervisor I',
  'Approved oleh Supervisor I' = 'Diajukan Penihilan',
  'Diajukan Penihilan' = 'Approved oleh Supervisor II',
}

/**
 * -> Unapproved
 * -> Approved oleh Supervisor I
 * -> Diajukan Penihilan
 * -> Approved oleh Supervisor II
 * -> Approved oleh Kabag /Approved oleh Wakabag
 */
