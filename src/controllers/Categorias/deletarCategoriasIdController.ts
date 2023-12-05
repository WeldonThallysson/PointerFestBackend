import { Response,Request } from "express";
import { DeletarCategoriasIdService } from "../../services/Categorias/deletarCategoriasIdService";

class DeletarCategoriaController {
    async handle(req:Request,res: Response){
        const {id} = req.params

        const deletarCategoriasId = new DeletarCategoriasIdService()
        const deletarCategorias = await deletarCategoriasId.execute({id})


        return res.json(deletarCategorias)
    }
}

export {DeletarCategoriaController}