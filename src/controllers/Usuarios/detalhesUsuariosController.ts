import { Request,Response } from "express";
import { DetalhesUsuarioServices } from "../../services/Usuarios/detalhesUsuarioService";


class DetalhesUsuarioController {
    async handle(req:Request,res:Response){

         const usuario_id = req.usuario_id;

         const detalhesUsuario = new DetalhesUsuarioServices();

         const detalhes = await detalhesUsuario.execute({usuario_id})

         return res.json(detalhes)

    }

}

export {DetalhesUsuarioController}