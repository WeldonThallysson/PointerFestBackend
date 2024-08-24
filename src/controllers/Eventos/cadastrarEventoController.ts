import { Request,Response } from "express";
import { CadastrarEventoService } from "../../services/Eventos/cadastrarEventoService";
interface IResponseCadastrarEventoController {
    status?: number
    message?: string
  }


class CadastrarEventoController {
    async handle(req: Request, res: Response){
        const { 
            nome,
            descricao,
            nomeLocalEvento,
            urlLocalizacaoEvento,
            dataEvento,
            horarioEvento,
            categoria_id,
            locaisCompraIngresso,
            urlInstagramDoComerciante,
            telefone,
           restricoesEvento,
           tipoVisibilidadeEvento,
           statusEvento,
        } = req.body;

        const cadastrarEvento = new CadastrarEventoService()
    
         if(!req.file){
            throw new Error("error upload file")
        } else{

            const {originalname, filename: bannerEvento} = req.file
            
            const eventoCadastrado = await cadastrarEvento.execute({ 
                nome,
                descricao,
                nomeLocalEvento,
                urlLocalizacaoEvento,
                bannerEvento,
                dataEvento,
                horarioEvento,
                categoria_id,
                locaisCompraIngresso,
                urlInstagramDoComerciante,
                telefone,
                restricoesEvento,
                tipoVisibilidadeEvento,
                statusEvento,
             }) as IResponseCadastrarEventoController
             
             if(eventoCadastrado.status === 403){
                return res.status(403).json(eventoCadastrado)
            }
            return res.json(eventoCadastrado)

        }
   
    }

}

export {CadastrarEventoController}