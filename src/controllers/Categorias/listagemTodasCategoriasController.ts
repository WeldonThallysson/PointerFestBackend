import { Request,Response } from "express";
import { ListagemTodasCategoriasService } from "../../services/Categorias/listagemTodasCategoriasService";
class ListagemTodasCategoriasController {
    async handle(req: Request, res: Response){
                
        const listagemTodasCategorias = new ListagemTodasCategoriasService()
        const listagemTodas = await listagemTodasCategorias.execute()

        return res.json(listagemTodas)
    }

}

export {ListagemTodasCategoriasController}