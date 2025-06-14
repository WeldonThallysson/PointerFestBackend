import { Request,response,Response } from "express";
import { GetDetailsPurchasesService } from "../../services/Purchases/purchesesGetDetailsService";




class GetDetailsPurchasesController {
    async handle(req: Request,res: Response){
        const idUserLogged = req.user_id
        const {id} = req.params
        const idOtherUser = req.query.idOtherUser as string

        const getDetailsVoucher = new GetDetailsPurchasesService()
        const responseGetDetailsVoucher = await getDetailsVoucher.execute({
            id,
            idUserLogged,
            idOtherUser
        })

        return res.status(responseGetDetailsVoucher.data.status).json(responseGetDetailsVoucher.data.items.dataDetailsVoucherFormated)
    }
}


export {GetDetailsPurchasesController}