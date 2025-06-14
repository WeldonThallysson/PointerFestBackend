import { Request, Response } from "express";   
import { GetActiveCouponService } from "../../services/Coupons/getActiveCouponService";
 

class GetActiveCouponController {
  async handle(req: Request, res: Response) {
    const idUserOwner = req.user_id;
    const { id } = req.params; 
    const idProduct = req.query.idProduct as string;
  
    const getActiveCouponController = new GetActiveCouponService();
    const responseActiveCouponController = await getActiveCouponController.execute({
      idUserOwner,
      codeCoupon: id,
      idProduct: idProduct
    });

    return res.status(responseActiveCouponController.data.status).json(responseActiveCouponController.data);
  }
}

export { GetActiveCouponController };
