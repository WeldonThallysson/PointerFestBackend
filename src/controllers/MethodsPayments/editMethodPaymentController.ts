import { Request, Response } from "express"
import { RegisterMethodPaymentService } from "../../services/MethodsPayments/registerMethodPaymentService"
import { EditMethodPaymentService } from "../../services/MethodsPayments/editMethodPaymentService"


class EditMethodPaymentController {
    async handle(req: Request ,res: Response){
       const id_user_logged = req.user_id
        const { id, name, description,typeMethodPayment } = req.body
        
        const editMethodPayment = new EditMethodPaymentService()
        const responseEditMethodPayment = await editMethodPayment.execute({id,id_user_logged,name,description,typeMethodPayment})

        return res.status(responseEditMethodPayment.data.status).json(responseEditMethodPayment.data)

    }
}

export { EditMethodPaymentController }