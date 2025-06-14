import { Request, Response } from "express";
import { EditCouponService } from "../../services/Coupons/editCouponService";

class EditCouponController {
  async handle(req: Request, res: Response) {
    const idUserOwner = req.user_id;

    const {
      idCoupon,
      codeCoupon,
      priceDiscount,
      expirationCoupon,
      limitUseMax,
      status,

      commissionPromoter,
      isPercentage,
      cpfForUseUnique,
      idPromoter,
      idProduct,
      isMultipleProducts,
      products,
    } = req.body;

    const editCouponController = new EditCouponService();
    const responseCouponController = await editCouponController.execute({
      idUserOwner,
      idCoupon,
      commissionPromoter,
      isPercentage,
      cpfForUseUnique,
      idPromoter,
      idProduct,
      status: status !== null ? status : true,
      codeCoupon,
      priceDiscount,
      isMultipleProducts ,
      products,
      expirationCoupon: expirationCoupon,
      limitUseMax: limitUseMax ?? null,
    });

    return res
      .status(responseCouponController.data.status)
      .json(responseCouponController.data);
  }
}

export { EditCouponController };
