
import { Request, Response } from 'express'
import { RecoverPasswordService } from '../../../services/Users/PasswordRecover/recoverPasswordUserService'



class RecoverPasswordController {
    async handle(req: Request, res: Response){   

        const {
            email,
        } = req.body

        const recoverPassword = new RecoverPasswordService()
        const responseRecoverPassword = await recoverPassword.execute({
            email
        })

        return res.status(responseRecoverPassword.data.status).json(responseRecoverPassword.data)
    }
}


export { RecoverPasswordController }