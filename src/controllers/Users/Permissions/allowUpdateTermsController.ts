import { Request, Response} from 'express'
import { AllowUpdateTermsService } from '../../../services/Users/Permissions/allowUpdateTermsService';


class AllowUpdateTermsController {
    async handle(req: Request, res: Response){
         const id_user_logged = req.user_id;

        const {
            termsUsePlatform,
            termsUseLGPD,
            termsPrivacyPolicy,
            termsReceiptNews
        } = req.body;

        const AllowUpdateTerms = new AllowUpdateTermsService()
        const responseAllowAccessUser = await AllowUpdateTerms.execute({
            id_user_logged,
            termsUsePlatform,
            termsUseLGPD,
            termsPrivacyPolicy,
            termsReceiptNews
        })

        return res.status(responseAllowAccessUser.data.status).json(responseAllowAccessUser.data)
    }
}


export {AllowUpdateTermsController}