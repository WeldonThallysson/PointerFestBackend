import { Request,Response } from "express";
import { EditarCategoriasService } from "../../services/Categorias/editarCategoriasService";

class EditarCategoriasController {
    async handle(req: Request, res: Response){
        const {id,nome} = req.body

        const editarCategoria = new EditarCategoriasService()
        const editar = await editarCategoria.execute({id,nome})

        return res.json(editar)

    }
}

export {EditarCategoriasController}