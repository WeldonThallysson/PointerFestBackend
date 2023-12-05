import { Request,Response } from "express";
import { ListarTodosEventosService } from "../../services/Eventos/listarTodosEventosService";



class ListarTodosEventosController {
    async handle(req: Request,res: Response){
            const listarTodosEventos = new ListarTodosEventosService();
            const listarEventos = await listarTodosEventos.execute();

            return res.json(listarEventos);
    }

}

export {ListarTodosEventosController}