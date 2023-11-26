import { Request,Response } from "express";
import { ListagemCidadesIdService } from "../../services/Cidades/listagemCidadesIdService";


class ListagemCidadesIdController {
   async handle(req: Request, res:Response){
        
       const {idCidade} = req.params

       const listagemCidadesId = new ListagemCidadesIdService() 
       const listagemId = await listagemCidadesId.execute({idCidade})

       return res.json(listagemId)

    
   }

}

export {ListagemCidadesIdController}