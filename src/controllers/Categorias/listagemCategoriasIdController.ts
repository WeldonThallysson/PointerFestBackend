import { Request, Response } from "express";
import { ListagemCategoriasIdService } from "../../services/Categorias/listagemCategoriasIdService";


class ListagemCategoriasIdController {
    async handle(req: Request, res: Response){
         const {id} = req.params

         const listagemCategoriasId = new ListagemCategoriasIdService
         const listagemId = await listagemCategoriasId.execute({id})

         return res.json(listagemId)
        
        }
    
}


export {ListagemCategoriasIdController}