import { Request,Response } from "express";
import { EditarEventosService } from "../../services/Eventos/editarEventoService";

class EditarEventoController {
    async handle(req: Request,res: Response){
        const {id} = req.params;
    
        const { 
            nome,
            descricao,
            nomeLocalEvento,
            urlLocalizacaoEvento,
            dataEvento,
            horarioEvento,
            categorias_id,
            cidades_id,
            locaisCompraIngresso,
            urlInstagramDoComerciante,
            telefone,
        } = req.body;
       
        const {originalname, filename: bannerEvento} = req.file
         const editarEvento = new EditarEventosService()
         
         const eventoEditado = await editarEvento.execute({
            id,
            nome,
            descricao,
            nomeLocalEvento,
            urlLocalizacaoEvento,
            dataEvento,
            horarioEvento,
            categorias_id,
            cidades_id,
            locaisCompraIngresso,
            urlInstagramDoComerciante,
            telefone,
            bannerEvento
        })

        return res.json(eventoEditado)
    }

}

export {EditarEventoController}