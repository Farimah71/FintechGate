export interface WebsiteInputs {
  id?: number;
  pspid: number;
  title: string;
  siteUrl: string;
  isDeleted?: boolean;
}
export interface WebsiteModel extends WebsiteInputs {}
