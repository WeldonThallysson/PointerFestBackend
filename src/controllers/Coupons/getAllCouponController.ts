import { Request, Response } from "express"; 
import { GetAllCouponService } from "../../services/Coupons/getAllCouponService";
 

class GetAllCouponController {
  async handle(req: Request, res: Response) {
    const idUserOwner = req.user_id;
    const codeCoupon = req.query.codeCoupon as string;
    const idPromoter = req.query.idPromoter as string;
    const status = req.query.status as string;
    const page = req.query.page as string;
    const limit = req.query.limit as string;
 

    const getAllCouponController = new GetAllCouponService();
    const responseAllCouponController = await getAllCouponController.execute({
      idUserOwner,
      codeCoupon,
      idPromoter,
      status,
      page: page ? Number(page) : null,
      limit: limit ? Number(limit) : null
    });

    return res.status(responseAllCouponController.data.status).json(responseAllCouponController.data);
  }
}

export { GetAllCouponController };
