import { Request,Response } from "express";
import { DeletarUsuariosService } from "../../services/Usuarios/deletarUsuarioService";


class DeletarUsuariosController {
    async handle(req: Request, res: Response){
        const {id} = req.params

        const deletarUsuario = new DeletarUsuariosService();
        const deletar = await deletarUsuario.execute({id});

        return res.json(deletar);
    }
}

export {DeletarUsuariosController}