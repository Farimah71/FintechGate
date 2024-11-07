export interface InvoiceInputs {
  pspid:number;
  invoiceDate:any;
  id?: number;
}
export interface InvoiceModel extends InvoiceInputs {
  invoiceNo?:number;
  totalAmount?:number;
  status?:number
}