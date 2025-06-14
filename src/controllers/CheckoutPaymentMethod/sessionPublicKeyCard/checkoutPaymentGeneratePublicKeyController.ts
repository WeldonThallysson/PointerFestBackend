import { Request, Response } from "express";
import { CheckoutPaymentGeneratePublicKeyService } from "../../../services/CheckoutPaymentMethod/sessionPublicKeyCard/checkoutPaymentGeneratePublicKeyService";
//

class CheckoutPaymentGeneratePublicKeyController {
  async handle(req: Request, res: Response) {
      const {
        type 
      } = req.body;
      
      // Verificação do método de pagamento
      const checkoutPaymentGeneratePublicKey = new CheckoutPaymentGeneratePublicKeyService();
      const responseCheckoutPaymentGeneratePublicKey = await checkoutPaymentGeneratePublicKey.execute({type})
        
    
      return res.status(responseCheckoutPaymentGeneratePublicKey.data.status).json(responseCheckoutPaymentGeneratePublicKey.data);
   
  }
}

export { CheckoutPaymentGeneratePublicKeyController };
