import { Request,Response } from "express"
import { PurchasesGetAllService } from "../../services/Purchases/purchasesGetAllService"


class GetAllPurchasesController {
    async handle(req: Request, res: Response){
            const idUserLogged = req.user_id
            const idOtherUser = req.query.idOtherUser as string
            const idMethodPayment = req.query.idMethodPayment as string
            const codePayment = req.query.codePayment as string
            const codeVoucher = req.query.codeVoucher as string;
            const datePayment = req.query.datePayment as string
            const limit = req.query.limit as string
            const page = req.query.page as string


            const getAllVoucher = new PurchasesGetAllService()
            const responseGetAllVoucher = await getAllVoucher.execute({
                idUserLogged,
                idOtherUser,
                codeVoucher,
                codePayment,
                datePayment,
                idMethodPayment,
                page: Number(page) ? Number(page) : null,
                limit: Number(limit) ? Number(limit) : null,
              
            })
            

            return res.status(responseGetAllVoucher.data.status).json(responseGetAllVoucher.data)
    }
}

export {GetAllPurchasesController}