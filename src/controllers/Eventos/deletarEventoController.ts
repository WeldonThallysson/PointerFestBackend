import { Response,Request } from "express";
import { DeletarEventoService } from "../../services/Eventos/deletarEventoService";

class DeletarEventoController {
    async handle(req: Request,res: Response){

        const {id} = req.params
        const deletarEvento = new DeletarEventoService();

        const eventoDeletado = await deletarEvento.execute({id})

        return res.json(eventoDeletado)
    }
}

export { DeletarEventoController}