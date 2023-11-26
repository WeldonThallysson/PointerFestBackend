import { Request,Response } from "express";
import { CadastroCidadesService } from "../../services/Cidades/cadastroCidadesService";


class CadastroCidadesController {
    
    async handle(req:Request,res:Response){

        const {nomeCidade,uf} = req.body

        const cadastroCidades = new CadastroCidadesService()
     
        const cidades = await cadastroCidades.execute({nomeCidade,uf});

     

        return res.json(cidades)

    }   
}

export {CadastroCidadesController}