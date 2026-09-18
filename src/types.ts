export type StudentRow = {
  level: string;
  gender: string;
  students: string;
  classes: string;
};

export type Submission = {
  id: number;
  schoolName: string;
  schoolCode?: string;
  schoolType: string;
  area: string;
  shift: string;
  availableSpaces?: number;
  fireHoses?: number;
  waterTanks?: number;
  waterTanksStatus?: string;
  fireHydrants?: number;
  principal: string;
  principalCode?: string;
  principalNationalId?: string;
  principalPhone?: string;
  principalType?: string;
  deputyName?: string;
  deputyCode?: string;
  deputyNationalId?: string;
  deputyPhone?: string;
  deputyType?: string;
  studentRows?: StudentRow[];
  students: number;
  classes: number;
  status: string;
};
