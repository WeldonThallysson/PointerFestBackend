import { Request, Response} from 'express'
import { AllowUpdateTutorialFirstAccessService } from '../../../services/Users/Permissions/allowUpdateTutorialFirstAccessService';


class AllowUpdateTutorialFirstAccessController {
    async handle(req: Request, res: Response){
         const id_user_logged = req.user_id;

        const {
            tutorialFirstAccess
        } = req.body;

        const allowUpdateTutorialFirstAccess = new AllowUpdateTutorialFirstAccessService()
        const responseAllowUpdateTutorialFirstAccess = await allowUpdateTutorialFirstAccess.execute({
            id_user_logged,
            tutorialFirstAccess
        })

        return res.status(responseAllowUpdateTutorialFirstAccess.data.status).json(responseAllowUpdateTutorialFirstAccess.data)
    }
}


export {AllowUpdateTutorialFirstAccessController}