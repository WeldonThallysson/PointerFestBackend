import { Request, Response } from "express"
import { RegisterMethodPaymentService } from "../../services/MethodsPayments/registerMethodPaymentService"
import { GetAllMethodPaymentService } from "../../services/MethodsPayments/getAllMethodPaymentService"


class GetAllMethodPaymentController {
    async handle(req: Request ,res: Response){
       const id_user_logged = req.user_id
        const name = req.query.name as string
        const description = req.query.description as string
        const typeMethodPayment = req.query.typeMethodPayment as string

        
        const getAllMethodPayment = new GetAllMethodPaymentService()
        const responseGetAllMethodPayment = await getAllMethodPayment.execute({id_user_logged,name,description,typeMethodPayment})

        return res.status(responseGetAllMethodPayment.data.status).json(responseGetAllMethodPayment.data)

    }
}

export { GetAllMethodPaymentController }