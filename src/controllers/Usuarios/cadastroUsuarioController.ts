import { Request,Response } from "express";
import { CadastroUsuarioService } from "../../services/Usuarios/cadastroUsuarioService";

class CadastroUsuarioController {
    async handle(req:Request,res:Response){

        const {nome,email,senha} = req.body;

        const cadastroUsuarios = new CadastroUsuarioService()
        const usuarios = await cadastroUsuarios.execute({nome,email,senha});

         res.json(usuarios)      
    }

}

export {CadastroUsuarioController};
