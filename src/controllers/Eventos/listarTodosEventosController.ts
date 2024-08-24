import { Request,Response } from "express";
import { ListarTodosEventosService } from "../../services/Eventos/listarTodosEventosService";



class ListarTodosEventosController {
    async handle(req: Request,res: Response){
           const nome = req.query.nome as string;

            const listarTodosEventos = new ListarTodosEventosService();
            const listarEventos = await listarTodosEventos.execute({nome});

            return res.json(listarEventos);
    }

}

export {ListarTodosEventosController}