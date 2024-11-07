export interface IntegratorInputs {
  id?: number;
  title: string;
  code: string;
  taxOfficeId: number;
  taxId: string;
  iban: string;
  ibanOwner: string;
  address?: string;
  commission: number;
  isDeleted?: boolean;
}

export interface IntegratorModel extends IntegratorInputs {}
