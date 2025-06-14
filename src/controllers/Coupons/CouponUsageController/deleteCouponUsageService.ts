import { Request, Response } from "express";
import { DeleteCouponUsageService } from "../../../services/Coupons/CouponUsageServices/deleteCouponUsageService";



class DeleteCouponUsageController {
    async handle(req: Request, res: Response){  
        const idUserOwner = req.user_id;
        const { couponsUsed } = req.body;

        const deleteUseCouponController = new DeleteCouponUsageService();
        const responseDeleteUseCouponController = await deleteUseCouponController.execute({
          idUserOwner,
          couponsUsed: couponsUsed,
        
        });
      
        return res.status(responseDeleteUseCouponController.data.status).json(responseDeleteUseCouponController.data)
      }

}

export { DeleteCouponUsageController }