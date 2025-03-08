import {Request, Response} from 'express'
import { BinGetDetailsItemsService } from '../../services/Bin/binGetDetailsItemsService'



class BinGetDetailsItemsController {
    async handle(req: Request, res: Response){
        const id = req.query.id as string;
        const idUserOwner = req.query.idUserOwner as string

        const binGetDetailsItems = new BinGetDetailsItemsService()

        const responseBinGetDetailsItems = await binGetDetailsItems.execute({
            id: id,
            idUserOwner: idUserOwner
        })

        return res.status(responseBinGetDetailsItems.data.status).json(responseBinGetDetailsItems.data)
 
    }
}

export {BinGetDetailsItemsController}






