import {Request, Response} from 'express'
import { BinRestoreItemsService } from '../../services/Bin/binRestoreItemsService'



class BinRestoreItemsController {
    async handle(req: Request, res: Response){
        const {
            id,
        } = req.params

        const binRegisterMoveItems = new BinRestoreItemsService()

        const responseBinRegisterMoveItems = await binRegisterMoveItems.execute({
            id: id,
        })

        return res.status(responseBinRegisterMoveItems.data.status).json(responseBinRegisterMoveItems.data)
 
    }
}

export {BinRestoreItemsController}






