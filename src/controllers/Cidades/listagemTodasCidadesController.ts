
import { Request,Response } from "express";
import { ListagemTodasCidadesService } from "../../services/Cidades/listagemTodasCidadesService";

class ListagemTodasCidadesController {
    async handle(req:Request,res:Response){

        const listagemTodasCidades = new ListagemTodasCidadesService()
        const cidadesListadas = await listagemTodasCidades.execute()

        return res.json(cidadesListadas)

    }
}

export {ListagemTodasCidadesController}