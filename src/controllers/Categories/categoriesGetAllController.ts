import { Request,Response } from "express";
import { ListagemTodasCategoriasService } from "../../services/Categories/listagemTodasCategoriasService";


class CategoriesGetAllController {
    async handle(req: Request, res: Response){
                
        const categoriesGetAllController = new CategoriesGetAllService()
        const responseCategoriesGetAllController = await categoriesGetAllController.execute()

        return res.json(responseCategoriesGetAllController)
    }

}

export {CategoriesGetAllController}