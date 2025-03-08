import {Request, Response} from 'express'
import { BinRegisterMoveItemsService } from '../../services/Bin/binRegisterMoveItemsService'



class BinRegisterMoveItemsController {
    async handle(req: Request, res: Response){
        const idUserLogged = req.user_id
        const {
            id,
            tableName

        } = req.body

        const binRegisterMoveItems = new BinRegisterMoveItemsService()

        const responseBinRegisterMoveItems = await binRegisterMoveItems.execute({
            id,
            idUserOwner: idUserLogged,
            tableName
        })

        return res.status(responseBinRegisterMoveItems.data.status).json(responseBinRegisterMoveItems.data)
 
    }
}

export {BinRegisterMoveItemsController}






