import { Response,Request } from "express";
import { CategoriesDeleteService } from "../../services/Categories/categoriesDeleteService";

class CategoriesDeleteController {
    async handle(req:Request,res: Response){
        const {id} = req.params

        const categoriesDelete = new CategoriesDeleteService()
        const responseCategoriesDelete = await categoriesDelete.execute({id})


        return res.status(responseCategoriesDelete.data.status).json(responseCategoriesDelete.data)
    }
}

export {CategoriesDeleteController}