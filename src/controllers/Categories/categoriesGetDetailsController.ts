import { Request, Response } from "express";
import { CategoriesGetDetailsService,  } from "../../services/Categories/categoriesGetDetailsService";


class CategoriesGetDetailsController {
    async handle(req: Request, res: Response){
         const {id} = req.params

         const categoriesGetDetails = new CategoriesGetDetailsService()
         const responseCategoriesGetDetails = await categoriesGetDetails.execute({id})

         return res.status(responseCategoriesGetDetails.data.status).json(responseCategoriesGetDetails.data)
        
        }
    
}


export {CategoriesGetDetailsController}