

import { Request, Response } from "express";  
import { PurchasesDeleteService } from "../../services/Purchases/purchasesDeleteService";

class PurchasesDeleteController {
  async handle(req: Request, res: Response) {
    const idUserLogged = req.user_id
    const {id} = req.params

 

    const deleteExternalPurchases = new PurchasesDeleteService();
    const responseDeleteExternalPurchases = await deleteExternalPurchases.execute({
            id,
            idUserLogged
    });

    return res
      .status(responseDeleteExternalPurchases.data.status)
      .json(responseDeleteExternalPurchases.data);
  }
}

export {PurchasesDeleteController};
