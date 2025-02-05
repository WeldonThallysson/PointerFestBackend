
import { Request, Response } from "express"
import { RedefinePasswordService } from "../../../services/Users/PasswordRecover/redefinePasswordUserService"



class RedefinePasswordController {
    async handle(req: Request, res: Response){   

        const {
            tokenPassword, 
            newPassword,
            confirmPassword
        } = req.body

        const recoverPassword = new RedefinePasswordService()
        const responseRecoverPassword = await recoverPassword.execute({
            tokenPassword, 
            newPassword,
            confirmPassword
        })

        return res.status(responseRecoverPassword.data.status).json(responseRecoverPassword.data)
    }
}


export { RedefinePasswordController }