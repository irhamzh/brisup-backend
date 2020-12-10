export interface IPersekotBase {
  date: Date;
  name: string;
  division: string;
  costNominal: number;
  information?: string;
  typePersekot?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const FinancialAdminPersekotType = ['LOP', 'DLK'];
