import { Request, Response } from "express";
import { ListarEventoIdService } from "../../services/Events/listarEventoIdService";

class ListarEventoIdController {
     async handle(req: Request, res: Response ){
        const {id} = req.params;
        
        const listarEventoId = new ListarEventoIdService();
        const listarEvento = await listarEventoId.execute({id});
        return res.json(listarEvento)
     }

}

export { ListarEventoIdController }