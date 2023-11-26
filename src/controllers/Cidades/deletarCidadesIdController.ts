import { Request,Response } from "express";
import { DeletarCidadesIdService } from "../../services/Cidades/deletarCidadesIdService";


class DeletarCidadesIdController {
    async handle(req: Request, res: Response){
        const {id} = req.params;

        const deletarCidadeId = new DeletarCidadesIdService();
        const deletarCidade = await deletarCidadeId.execute({id});


        return res.json(deletarCidade)
        

    }
}

export {DeletarCidadesIdController}