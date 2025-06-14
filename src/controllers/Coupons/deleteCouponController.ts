import { Request, Response } from "express";   
import { DeleteCouponService } from "../../services/Coupons/deleteCouponService";
 

class DeleteCouponController {
  async handle(req: Request, res: Response) {
    const idUserOwner = req.user_id;
    const { id } = req.params; 

    const DeleteCouponController = new DeleteCouponService();
    const responseDeleteCouponController = await DeleteCouponController.execute({
      idUserOwner,
      idCoupon: id
    });

    return res.status(responseDeleteCouponController.data.status).json(responseDeleteCouponController.data);
  }
}

export { DeleteCouponController };
