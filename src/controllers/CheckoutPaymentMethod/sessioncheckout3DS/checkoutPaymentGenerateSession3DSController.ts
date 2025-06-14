import { Request, Response } from "express";
import { CheckoutPaymentGenerateSession3DSService } from "../../../services/CheckoutPaymentMethod/sessioncheckout3DS/checkoutPaymentGenerateSession3DSService";
//import { CreditCardCheckoutService } from "../../services/CheckoutPaymentMethod/CreditCardCheckoutService";
//import { DebitCheckoutService } from "../../services/CheckoutPaymentMethod/DebitCheckoutService";

class CheckoutPaymentGenerateSession3DSController {
  async handle(req: Request, res: Response) {
      
      // Verificação do método de pagamento
      const checkoutPaymentGenerateSession3DS = new CheckoutPaymentGenerateSession3DSService();
      const responseCheckoutPaymentGenerateSession3DS= await checkoutPaymentGenerateSession3DS.execute()
        
    
      return res.status(responseCheckoutPaymentGenerateSession3DS.data.status).json(responseCheckoutPaymentGenerateSession3DS.data);
   
  }
}

export { CheckoutPaymentGenerateSession3DSController };
