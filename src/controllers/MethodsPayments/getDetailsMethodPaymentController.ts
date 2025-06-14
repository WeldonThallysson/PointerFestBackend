import { Request, Response } from "express"
import { GetDetailsMethodPaymentService } from "../../services/MethodsPayments/getDetailsMethodPaymentService"
 


class GetDetailsMethodPaymentController {
    async handle(req: Request ,res: Response){
       const id_user_logged = req.user_id
        const { id } = req.params
        const getDetailsMethodPayment = new GetDetailsMethodPaymentService()
        const responseGetDetailsMethodPayment = await getDetailsMethodPayment.execute({id_user_logged,id})

        return res.status(responseGetDetailsMethodPayment.data.status).json(responseGetDetailsMethodPayment.data)

    }
}

export { GetDetailsMethodPaymentController }