import prismaClient from "../../prisma";
import { hash } from "bcryptjs";


interface CadastroUsuariosType {
        nome: string,
        email: string,
        senha: string,

}
class CadastroUsuarioService {
    async execute({nome,email,senha}: CadastroUsuariosType){


        if(!email){
           throw new Error("O Email não foi enviado")         
        }

        const verificaEmailsExistentes = await prismaClient.usuarios.findFirst({
            where: {
                email: email
            }
        })
        if(verificaEmailsExistentes){
            throw new Error("Este email já existe")
        }
        const senhaHash = await hash(senha, 8)

        const usuarios = await prismaClient.usuarios.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaHash,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                update_At: true,
                created_At: true
            }
        })
        
        return usuarios
    }

}

export {CadastroUsuarioService}