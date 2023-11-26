import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
interface loginUsuarioType {
    
     email: string,
     senha: string,
}


class LoginUsuarioService {
    async execute({email,senha}: loginUsuarioType){

        const usuarios = await prismaClient.usuarios.findFirst({
            where: {
                email
            }
        })

        if(!usuarios){
            throw new Error("Este email não existe !")
        }

        const verificarSenhaCriptografada = await compare(senha,usuarios.senha)
    
        if(!verificarSenhaCriptografada){
            throw new Error("Sua senha está incorreta")
        }

        const token = sign(
            {
                nome: usuarios.nome,
                senha: usuarios.senha
            },
            process.env.JWT_SECRET,
            {
                subject: usuarios.id,
                expiresIn: "30d"
            }
            )

     return {
        id: usuarios.id,
        email: usuarios.email,
        token: token
     }

    }
}

export {LoginUsuarioService}