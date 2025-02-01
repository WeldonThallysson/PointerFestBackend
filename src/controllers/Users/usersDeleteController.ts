import { Request,Response } from "express";
import { UsersDeleteService } from "../../services/Users/usersDeleteService";

class UsersDeleteController {
    async handle(req: Request, res: Response){
        const {id} = req.params
        const id_user_logged = req.user_id

        const usersDelete = new UsersDeleteService();

        const responseUsersDelete = await usersDelete.execute({
            id: id,
            id_user_logged: id_user_logged
            
        });

        return res.json(responseUsersDelete);
    }
}

export {UsersDeleteController}