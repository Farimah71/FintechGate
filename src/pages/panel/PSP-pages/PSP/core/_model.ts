export interface PSPInputs {
  id?: number;
  title: string;
  address?: string;
  taxOfficeId: number;
  taxId: string;
  code: string;
  commission: number;
  isDeleted?: boolean;
}
export interface PSPModel extends PSPInputs {}
