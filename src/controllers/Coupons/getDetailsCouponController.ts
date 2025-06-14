import { Request, Response } from "express";  
import { GetDetailsCouponService } from "../../services/Coupons/getDetailsCouponService";
 

class GetDetailsCouponController {
  async handle(req: Request, res: Response) {
    const idUserLogged = req.user_id;
    const { id } = req.params; 
 

    const getDetailsCouponController = new GetDetailsCouponService();
    const responseDetailsCouponController = await getDetailsCouponController.execute({
      idUserLogged,
      idCoupon: id
    });

    return res.status(responseDetailsCouponController.data.status).json(responseDetailsCouponController.data);
  }
}

export { GetDetailsCouponController };
