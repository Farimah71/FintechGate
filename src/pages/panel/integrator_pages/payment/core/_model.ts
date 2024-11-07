export interface PaymentInputs {
  integratorId: number;
  paymentDate:Date;
  id?: number;
}
export interface PaymentModel extends PaymentInputs {
  paymentNo:string;
  totalAmount:number;
  status:number
}