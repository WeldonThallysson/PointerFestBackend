import { Request, Response } from "express";
import { EditCouponUsageService } from "../../../services/Coupons/CouponUsageServices/editCouponUsageService";


class EditCouponUsageController {
    async handle(req: Request, res: Response){  
        const idUserOwner = req.user_id;
        const { couponsUsed } = req.body;

        const editUseCouponController = new EditCouponUsageService();
        const responseEditUseCouponController = await editUseCouponController.execute({
          idUserOwner,
          couponsUsed: couponsUsed,
        
        });
      
        return res.status(responseEditUseCouponController.data.status).json(responseEditUseCouponController.data)
      }
    }
    
export {EditCouponUsageController}