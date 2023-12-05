import { Request, Response } from "express";
import { EditarCidadesService } from "../../services/Cidades/editarCidadesService";



class EditarCidadesController {
    async handle(req: Request, res: Response){

          const { id, nomeCidade, uf} = req.body;

          const editarCidade = new EditarCidadesService()

          const cidadeEditada = await editarCidade.execute({id,nomeCidade,uf});

          return res.json(cidadeEditada)

    }
}

export {EditarCidadesController}