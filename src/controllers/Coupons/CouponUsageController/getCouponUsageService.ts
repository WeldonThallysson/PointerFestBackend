import { Request, Response } from "express"; 
import { GetCouponUsageService } from "../../../services/Coupons/CouponUsageServices/getCouponUsageService";



class GetCouponUsageController {
    async handle(req: Request, res: Response){  
        const idUserOwner = req.user_id;
        const { page, limit } = req.body;

        const getUseCouponController = new GetCouponUsageService();
        const responseGetUseCouponController = await getUseCouponController.execute({
          idUserOwner,
          page: page,
          limit: limit
        
        });
      
        return res.status(responseGetUseCouponController.data.status).json(responseGetUseCouponController.data)
      }

}

export { GetCouponUsageController }