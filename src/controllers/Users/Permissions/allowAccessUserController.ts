import { Request, Response} from 'express'
import { AllowAccessUserService } from '../../../services/Users/Permissions/allowAccessUserServices';


class AllowAccessUserController {
    async handle(req: Request, res: Response){
         const id_user_logged = req.user_id;

        const {
            cpfCnpj,
            typeAccess, 
        } = req.body;

        const allowAccessUser = new AllowAccessUserService()
        const responseAllowAccessUser = await allowAccessUser.execute({
            cpfCnpj,
            id_user_logged,
            typeAccess
        })

        return res.status(responseAllowAccessUser.data.status).json(responseAllowAccessUser.data)
    }
}


export {AllowAccessUserController}