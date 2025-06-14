import { Request, Response } from "express";
import { CheckoutPaymentConsultPublicKeyService } from "../../../services/CheckoutPaymentMethod/sessionPublicKeyCard/checkoutPaymentConsultPublicKeyService";
//

class CheckoutPaymentConsultPublicKeyController {
  async handle(req: Request, res: Response) {
 
      // Verificação do método de pagamento
      const checkoutPaymentConsultPublicKey = new CheckoutPaymentConsultPublicKeyService();
      const responseCheckoutPaymentConsultPublicKey = await checkoutPaymentConsultPublicKey.execute()
        
    
      return res.status(responseCheckoutPaymentConsultPublicKey.data.status).json(responseCheckoutPaymentConsultPublicKey.data);
   
  }
}

export { CheckoutPaymentConsultPublicKeyController };
