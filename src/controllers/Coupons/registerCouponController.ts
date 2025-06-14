import { Request, Response } from "express";
import { RegisterCouponService } from "../../services/Coupons/registerCouponService";
 

class RegisterCouponController {
  async handle(req: Request, res: Response) {
    const idUserOwner = req.user_id;

    const {
      codeCoupon,
      priceDiscount,
      expirationCoupon,
      limitUseMax,
      idPromoter,
      idProduct,
      commissionPromoter,
      isPercentage,
      cpfForUseUnique,
      isMultipleProducts, 
      products      
    } = req.body;

    const registerCouponController = new RegisterCouponService();
    const responseCouponController = await registerCouponController.execute({
      idUserOwner,
      codeCoupon,
      priceDiscount,
      idPromoter,
      idProduct,
      commissionPromoter,
      isPercentage,
      cpfForUseUnique,
      isMultipleProducts, 
      products,
      expirationCoupon: expirationCoupon ?? null,
      limitUseMax: limitUseMax ?? null,
    });

    return res.status(responseCouponController.data.status).json(responseCouponController.data);
  }
}

export { RegisterCouponController };
