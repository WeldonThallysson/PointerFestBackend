import {Request,Response} from 'express'
import { LoginUsuarioService } from '../../services/Usuarios/loginUsuarioService'


class LoginUsuarioController{
    async handle(req:Request, res: Response){

        const {email,senha} = req.body

        const loginUsuarios = new LoginUsuarioService()
        const usuarios = await loginUsuarios.execute({email,senha})

        return res.json(usuarios)


    }
}

export {LoginUsuarioController}