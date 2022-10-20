export enum ReportType {
  Income = 'income',
  Expense = 'expense',
}

export interface Report {
  id: string;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  type: ReportType;
}

export interface Data {
  report: Report[];
}

export const data: Data = {
  report: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Income,
    },
    {
      id: 'uuid2',
      source: 'Youtube',
      amount: 750,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Income,
    },
    {
      id: 'uuid3',
      source: 'Insurance',
      amount: 250,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Expense,
    },
  ],
};
