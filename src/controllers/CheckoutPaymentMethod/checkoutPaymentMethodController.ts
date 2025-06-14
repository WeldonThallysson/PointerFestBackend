import { Request, Response } from "express";
import { CheckoutPaymentMethodService } from "../../services/CheckoutPaymentMethod/checkoutPaymentMethodService"; 
//import { PixCheckoutService } from "../../services/CheckoutPaymentMethod/PixCheckoutService";
//import { CreditCardCheckoutService } from "../../services/CheckoutPaymentMethod/CreditCardCheckoutService";
//import { DebitCheckoutService } from "../../services/CheckoutPaymentMethod/DebitCheckoutService";

class CheckoutPaymentController {
  async handle(req: Request, res: Response) {

      const id_user_logged = req.user_id;
      const {
        paymentMethodId,
        products,
        cardData,
        id_authentication_method
      } = req.body;
      
      // Verificação do método de pagamento
      const checkoutMethodPayment = new CheckoutPaymentMethodService();
      const responseMethodPayment = await checkoutMethodPayment.execute({
        id_user_logged,
        paymentMethodId,
        id_authentication_method,
        products: products,
        cardData: cardData
      })
        
    
      return res.status(responseMethodPayment?.data?.status).json(responseMethodPayment.data);
   
  }
}

export { CheckoutPaymentController };
