import { Request, Response } from 'express' 
import { GetDispatchPurchasesForEmailsService } from '../../services/Purchases/purchasesGetDispatchForEmailsService'


class GetDispatchPurchasesForEmailsController {
    async handle(req: Request, res: Response){
        const idUserLogged = req.user_id
        const {id} = req.params
        const idOtherUser = req.query.idOtherUser as string
        const getDispatchPurchasesForEmails = new GetDispatchPurchasesForEmailsService()
        const responseGetDispatchPurchasesForEmails = await getDispatchPurchasesForEmails.execute({
            idVoucher: id,
            idUserLogged,
            idOtherUser
        })

        return res.status(responseGetDispatchPurchasesForEmails.data.status).json(responseGetDispatchPurchasesForEmails.data)
    }
}


export {GetDispatchPurchasesForEmailsController}