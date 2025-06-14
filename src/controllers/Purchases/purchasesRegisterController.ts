import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { TypesAccess } from "../../keys/typeAccess/typesAccess";
import { PurchasesRegisterService } from "../../services/Purchases/purchasesRegisterService";

class PurchasesRegisterController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const {
      products,
      cpfCnpj,
      typeMethodPayment,
      codePayment,
      codeReferencePayment,
      datePayment,
    } = req.body;

    const userLoggedExists = await prismaClient.users.findFirst({
      where: {
        id: user_id,
      },
    });

    if (userLoggedExists?.typeAccess === TypesAccess.User) {
      return res.status(403).json({
        data: {
          message:
            "Sua conta não possui autorização para realizar esta ação, apenas admin e master",
        },
      });
    }

    const registerExternalPurchases = new PurchasesRegisterService();
    const responseRegisterExternalPurchases =
      await registerExternalPurchases.execute({
        products,
        cpfCnpj,
        typeMethodPayment,
        codePayment,
        codeReferencePayment,
        datePayment,
      });

    return res
      .status(responseRegisterExternalPurchases.data.status)
      .json(responseRegisterExternalPurchases.data);
  }
}

export { PurchasesRegisterController };
