import { Request,Response } from "express";
import { CategoriesGetAllService,  } from "../../services/Categories/categoriesGetAllService";


class CategoriesGetAllController {
    async handle(req: Request, res: Response){
        const {
            label,
            limit,
            name,
            page
        } = req.body
                
        const categoriesGetAllController = new CategoriesGetAllService()
        const responseCategoriesGetAllController = await categoriesGetAllController.execute({
            label,
            limit,
            name,
            page
        })

        return res.json(responseCategoriesGetAllController)
    }

}

export {CategoriesGetAllController}