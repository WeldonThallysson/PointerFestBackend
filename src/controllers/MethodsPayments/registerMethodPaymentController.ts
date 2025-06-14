import { Request, Response } from "express"
import { RegisterMethodPaymentService } from "../../services/MethodsPayments/registerMethodPaymentService"


class RegisterMethodPaymentController {
    async handle(req: Request ,res: Response){
       const id_user_logged = req.user_id
        const { name, description, typeMethodPayment } = req.body
        const registerMethodPayment = new RegisterMethodPaymentService()
        const responseRegisterMethodPayment = await registerMethodPayment.execute({id_user_logged,name,description,typeMethodPayment})

        return res.status(responseRegisterMethodPayment.data.status).json(responseRegisterMethodPayment.data)

    }
}

export { RegisterMethodPaymentController }