

import { Request, Response } from "express";  
import prismaClient from "../../prisma";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import { PurchasesEditService } from "../../services/Purchases/purchasesEditService";

class PurchasesEditController {
  async handle(req: Request, res: Response) {
    const idUserLogged = req.user_id
    const {
        id,
        products,
        typeMethodPayment,
        codePayment,
        codeReferencePayment,
        datePayment,
    } = req.body;

    const userLoggedExists = await prismaClient.users.findFirst({
        where: {
            id: idUserLogged
        }
    })

    if(userLoggedExists?.typeAccess === TypesAccess.User){
        return res.status(403).json({
            data: {
                message: "Sua conta não possui autorização para realizar esta ação, apenas admin e master"
            }
        })
    }

    const editExternalPurchases = new PurchasesEditService();
    const responseEditExternalPurchases = await editExternalPurchases.execute({
        id,
        idUserLogged,
        typeMethodPayment,
        codeReferencePayment,
        codePayment,
        datePayment,
        products
    });

    return res
      .status(responseEditExternalPurchases.data.status)
      .json(responseEditExternalPurchases.data);
  }
}

export {PurchasesEditController};
