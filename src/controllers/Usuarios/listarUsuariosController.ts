import {Request,Response } from 'express'
import { ListarUsuariosService } from "../../services/Usuarios/listarUsuariosSevice"; 


class ListarUsuariosController {
    async handle(req: Request, res: Response){
       const listarUsuarios = new ListarUsuariosService()
       const usuarios = await listarUsuarios.execute()
       return res.json(usuarios)
    }

}

export {ListarUsuariosController}