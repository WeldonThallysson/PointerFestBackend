import { Request, Response } from "express";
import { RegisterUseCouponService } from "../../../services/Coupons/CouponUsageServices/registerUseCouponService"; 

class RegisterUseCouponController {
  async handle(req: Request, res: Response) {
    const idUserOwner = req.user_id;
    const { couponsUsed } = req.body;

    const getUseCouponController = new RegisterUseCouponService();
    const responseUseCouponController = await getUseCouponController.execute({
      idUserOwner,
      couponsUsed: couponsUsed,
    
    });

    if (Array.isArray(responseUseCouponController.data)) {
      return res
        .status(responseUseCouponController.data[0].status)
        .json(responseUseCouponController.data);
    } else {
      return res
        .status(responseUseCouponController.data.status)
        .json(responseUseCouponController.data);
    }
  }
}

export { RegisterUseCouponController };
