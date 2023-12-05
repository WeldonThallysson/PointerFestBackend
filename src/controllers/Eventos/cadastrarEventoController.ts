import { Request,Response } from "express";
import { CadastrarEventoService } from "../../services/Eventos/cadastrarEventoService";



class CadastrarEventoController {
    async handle(req: Request, res: Response){
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

        const cadastrarEvento = new CadastrarEventoService()
    
         if(!req.file){
            throw new Error("error upload file")
        } else{

            const {originalname,filename: bannerEvento} = req.file
            
            const eventoCadastrado = await cadastrarEvento.execute({ 
                nome,
                descricao,
                nomeLocalEvento,
                urlLocalizacaoEvento,
                bannerEvento,
                dataEvento,
                horarioEvento,
                categorias_id,
                cidades_id,
                locaisCompraIngresso,
                urlInstagramDoComerciante,
                telefone,
             })
            return res.json(eventoCadastrado)

        }
   
    }

}

export {CadastrarEventoController}